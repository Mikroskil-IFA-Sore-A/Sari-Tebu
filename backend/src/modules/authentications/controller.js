import * as AuthenticationService from "./service.js";

export async function login(req, res) {
    const { emailAddress, password } = req.validatedBody;
    const token = await AuthenticationService.login(emailAddress, password);
    res.status(200).json({
        status: "success",
        data: token,
    });
}

export async function refreshAccessToken(req, res) {
    const { refreshToken } = req.validatedBody;
    const accessToken =
        await AuthenticationService.refreshAccessToken(refreshToken);

    res.status(200).json({
        status: "success",
        data: {
            accessToken,
        },
    });
}

export async function logout(req, res) {
    const { refreshToken } = req.validatedBody;
    await AuthenticationService.logout(refreshToken);
    res.status(200).json({
        status: "success",
        message: "Berhasil menghapus sesi login",
    });
}
