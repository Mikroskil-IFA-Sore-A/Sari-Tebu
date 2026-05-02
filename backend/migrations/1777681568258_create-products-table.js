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
    pgm.createTable("products", {
        id: { 
            type: "VARCHAR(32)",
            primaryKey: true
        },
        name: {
            type: "TEXT",
            notNull: true
        },
        price: {
            type: "INTEGER",
            notNull: true
        },
        stock: {
            type: "INTEGER",
            notNull: true, 
            default: 0
        }, 
        created_at: {
            type: "TEXT",
            notNull: true,
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('products');
};
