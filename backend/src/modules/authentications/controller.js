import bcrypt from "bcrypt";

import ClientError from "../../shared/exceptions/client_error.js";
import * as TokenManager from "../../shared/security/token_manager.js";
import UserRepository from "../users/repository.js";
import authenticationsRepository from "./repository.js";

async function verifyUserCredential({ username, password }) {
    const user = await UserRepository.getByUsername(username);
    if (!user) {
        throw ClientError.notFound("Username does not exist");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw ClientError.unauthorized("Password does not match");
    }

    return user.id;
}

export async function login(req, res) {
    const { username, password } = req.body;
    const id = await verifyUserCredential({
        username,
        password,
    });

    const accessToken = TokenManager.generateAccessToken({ sub: id });
    const refreshToken = TokenManager.generateRefreshToken({ sub: id });

    await authenticationsRepository.addRefreshToken(id, refreshToken);
    res.status(201).json({
        status: "success",
        data: {
            accessToken: accessToken,
            refreshToken: refreshToken,
        },
    });
}

export async function refreshAccessToken(req, res) {
    const { refreshToken } = req.body;

    // cek dulu, apakah ini token yang valid. jika tidak no point query ke database
    const { sub: id } = TokenManager.verifyRefreshToken(refreshToken);

    const ok = await authenticationsRepository.verifyRefreshToken(refreshToken);
    if (!ok) {
        throw ClientError.unauthorized();
    }

    const accessToken = TokenManager.generateAccessToken({ sub: id });
    res.status(200).json({
        status: "success",
        data: {
            accessToken: accessToken,
        },
    });
}

export async function logout(req, res) {
    const { refreshToken } = req.body;

    // verify apakah ini merupakan valid JWT, jika tidak akan throw
    TokenManager.verifyRefreshToken(refreshToken);

    try {
        await authenticationsRepository.deleteRefreshToken(refreshToken);
        res.status(200).json({
            status: "success",
            message: "token removed (i.e. logout)",
        });
    } catch (err) {
        // NOTE: Edge case JWT signature valid tapi token tidak ditemukan di DB
        //       artinya sudah dihapus (i.e. sudah logout)
        if (err.code === "P2025")
            throw ClientError.unauthorized();
        throw err;
    }
}
