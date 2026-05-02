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
    pgm.createTable("transactions", {
        id: { type: 'VARCHAR(32)', primaryKey: true },
        total: { type: 'INTEGER', notNull: true },
        cash: { type: 'INTEGER', notNull: true },
        change: { type: 'INTEGER', notNull: true },
        created_at: { type: 'TIMESTAMP', default: pgm.func('NOW()') }
    });

    pgm.createTable("transactions_items", {
        id: { type: 'VARCHAR(32)', primaryKey: true },
        transaction_id: { type: 'VARCHAR(32)', notNull: true, references: 'transactions(id)', onDelete: 'CASCADE' },
        product_id: { type: 'VARCHAR(32)', notNull: true },
        product_name: { type: 'TEXT', notNull: true },
        product_price: { type: 'INTEGER', notNull: true },    
        discount: { type: 'INTEGER', default: 0 },
        quantity: { type: 'INTEGER', notNull: true },
        subtotal: { type: 'INTEGER', notNull: true },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('transactions_items');
    pgm.dropTable('transactions');
};
