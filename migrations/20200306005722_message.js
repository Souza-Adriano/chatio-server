exports.up = function(knex, Promise) {
    return knex.schema.createTable("messages", table => {
        table.uuid("id").primary();
        table.uuid('protocol').notNull();
        table.string('from').notNull();
        table.string('content', 1000).notNull();
        table.string('to').notNull();
        table.timestamps(true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("messages");
};
