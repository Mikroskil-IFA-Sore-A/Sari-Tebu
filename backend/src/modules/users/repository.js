import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

import { prisma } from "../../shared/database/index.js";

// Kolom-kolom pada tabel users yang publik (yang aman untuk di kembalikan sebagai response)
// TLDR, jangan kembalikan password
const publicField = {
    id: true,
    username: true,
    fullname: true,
    created_at: true,
};

class UserRepository {
    async createUser({ username, password, fullname }) {
        const id = `user-${nanoid()}`;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                id,
                username,
                password: hashedPassword,
                fullname,
            },
        });
        return user.id;
    }

    async getByUsername(username) {
        return await prisma.user.findUnique({
            where: { username: username },
            // NOTE: Kita dapat mengembalikan seluruh row, karena disaat ini fungsi ini hanya dipakai untuk
            //       internal use dan tidak di-expose ke public route.
            //
            // select: publicField
        });
    }

    async getById(id) {
        return await prisma.user.findUnique({
            where: { id: id },
            select: publicField,
        });
    }

    async getAll({ search = "" } = {}) {
        return await prisma.user.findMany({
            where: {
                OR: [
                    { username: { contains: search } },
                    { fullname: { contains: search } },
                ],
            },
            select: publicField,
            orderBy: { created_at: "desc" },
        });
    }

    async deleteUser(id) {
        return await prisma.user.delete({
            where: { id },
            select: publicField,
        });
    }
}

export default new UserRepository();
