import { prisma } from "../../shared/database/index.js";

class authenticationsRepository {
    async addRefreshToken(userId, refreshToken) {
        // Tiap kali login, hapus refresh token lama dan kasih yang baru
        await prisma.auth.deleteMany({
            where: { user_id: userId },
        });

        return await prisma.auth.create({
            data: { refresh_token: refreshToken, user_id: userId },
        });
    }

    async verifyRefreshToken(refreshToken) {
        return await prisma.auth.findUnique({
            where: { refresh_token: refreshToken },
        });
    }

    async deleteRefreshToken(refreshToken) {
        return await prisma.auth.delete({
            where: { refresh_token: refreshToken },
        });
    }
}

export default new authenticationsRepository();
