import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

import { prisma } from "#/shared/database/index.js";
import ClientError from "#/shared/exceptions/client_error.js";

/**
 * @typedef {NonNullable<Awaited<ReturnType<typeof prisma.user.findUnique>>>} User
 * @typedef {Pick<User, "id" | "email_address" | "username" | "created_at" | "updated_at">} PublicUserField
 */

const publicUserField = {
    id: true,
    email_address: true,
    username: true,
    created_at: true,
    updated_at: true,
};

const BCRYPT_ROUNDS = 12;

/**
 * Membuat user baru
 * @param {{ emailAddress: string, username: string, password: string }} payload
 * @returns {Promise<PublicUserField>}
 * @throws {ClientError}
 */
export async function createUser(payload) {
    const { emailAddress, username, password } = payload;
    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
    try {
        return await prisma.user.create({
            data: {
                id: `user-${nanoid()}`,
                email_address: emailAddress,
                username,
                password_hash: hashedPassword,
            },
            select: publicUserField,
        });
    } catch (err) {
        if (err.code === "P2002") {
            throw ClientError.conflict("Email address sudah digunakan");
        }
        throw err;
    }
}

/**
 * Dapatkan detail user berdasarkan id
 * @param {string} id
 * @returns {Promise<PublicUserField>}
 * @throws {ClientError}
 */
export async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: { id: id },
        select: publicUserField,
    });
    if (!user) {
        throw ClientError.notFound("User dengan id tersebut tidak ditemukan");
    }
    return user;
}

/**
 * Dapatkan user(s) berdasarkan email
 * @param {string} emailAddress
 * @returns {Promise<PublicUserField[]>}
 */
export async function getUsers(emailAddress = "") {
    return await prisma.user.findMany({
        where: {
            email_address: emailAddress ? emailAddress : undefined,
        },
        select: publicUserField,
    });
}

/**
 * Memperbarui data user berdasarkan id
 * @param {string} id
 * @param {{ username?: string, emailAddress?: string }} payload
 * @returns {Promise<PublicUserField>}
 * @throws {ClientError}
 */
export async function updateUser(id, payload) {
    try {
        return await prisma.user.update({
            where: { id },
            data: payload,
            select: publicUserField,
        });
    } catch (err) {
        if (err.code === "P2002") {
            throw ClientError.conflict("Email address sudah digunakan");
        }
        if (err.code === "P2025") {
            throw ClientError.notFound("User tidak ditemukan");
        }
        throw err;
    }
}

/**
 * Hapus user berdasarkan id
 * @param {string} id
 * @returns {Promise<void>}
 * @throws {ClientError}
 */
export async function deleteUser(id) {
    try {
        await prisma.user.delete({
            where: { id: id },
        });
    } catch (err) {
        if (err.code === "P2025")
            throw ClientError.notFound("User tidak ditemukan");
        throw err;
    }
}
