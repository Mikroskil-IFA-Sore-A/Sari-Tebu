/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable("carts", {
        id: {
            type: "VARCHAR(32)",
            primaryKey: true
        },
        product_id: {
            type: "VARCHAR(32)", 
            notNull: true,
            references: "products(id)"
        },
        quantity: {
            type: "INTEGER",
            notNull: true,
            default: 1
        },
        added_at: {
            type: "TIMESTAMP",
            default: pgm.func("NOW()")
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable("carts");
};
