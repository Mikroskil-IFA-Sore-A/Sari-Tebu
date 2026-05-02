import UserRepository from "./repository.js";
import ClientError from "../../shared/exceptions/client_error.js";

export async function createUser(req, res) {
    const { username, password, fullname } = req.body;

    const user = await UserRepository.getUserByUsername(username);
    if (user) {
        throw ClientError.badRequest("username ini sudah diambil");
    }

    const row = await UserRepository.createUser({
        username,
        password,
        fullname,
    });

    res.status(201).json({
        status: "success",
        data: {
            userId: row.id,
        },
    });
}

export async function getUsers(req, res) {
    const users = await UserRepository.getAll();
    res.status(200).json({
        status: "success",
        data: { users }
    });
}

export async function deleteUser(req, res) {
    const ok = await UserRepository.deleteUser(req.params.id);
    if (!ok) {
        throw ClientError.notFound();
    }
    res.status(200).json({
        status: "success",
        message: "User deleted"
    });
}
