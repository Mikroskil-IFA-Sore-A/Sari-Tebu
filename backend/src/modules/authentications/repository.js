import pool from "../../shared/database/index.js";

class authenticationsRepository {
    async addRefreshToken(refreshToken) {
        const pq = {
            text: `INSERT INTO authenticationss VALUES ($1)`,
            values: [refreshToken],
        };
        await pool.query(pq);
    }

    async verifyRefreshToken(refreshToken) {
        const pq = {
            text: `SELECT refresh_token FROM authenticationss WHERE refresh_token = $1`,
            values: [refreshToken],
        };

        const { rows } = await pool.query(pq);
        return rows.length > 0;
    }

    async deleteRefreshToken(refreshToken) {
        const pq = {
            text: `DELETE FROM authenticationss WHERE refresh_token = $1`,
            values: [refreshToken],
        };
        const { rowCount } = await pool.query(pq);
        return rowCount > 0;
    }
}

export default new authenticationsRepository();
