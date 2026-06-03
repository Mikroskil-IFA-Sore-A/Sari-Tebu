/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Request<{ id: string }>} RequestWithId
 * @typedef {import('express').Response} Response
 */

/**
 * @param {Request} req
 * @param {Response} res
 */
export async function checkout(req, res) {}

/**
 * @param {Request} req
 * @param {Response} res
 */
export async function getTransactions(req, res) {}

/**
 * @param {Request} req
 * @param {Response} res
 */
export async function getTransaction(req, res) {}
