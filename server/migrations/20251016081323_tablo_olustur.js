/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {

    // USERS TABLOSU
    await knex.schema.createTable("users", (table) => {
        table.uuid("id").primary();
        table.string("name").notNullable();
        table.string("surname").notNullable();
        table.string("email").unique().notNullable();
        table.string("password").notNullable(); // kullanıcı şifresi
        table.integer("avatarIndex").defaultTo(0); // avatar için index (örnek: 0, 1, 2...)
        table.timestamps(true, true); // created_at, updated_at
    });

    // TASKS TABLOSU
    await knex.schema.createTable("tasks", (table) => {
        table.uuid("id").primary();
        table.string("title").notNullable();
        table.text("description");
        table.string("status").defaultTo("todo");
        table.uuid("created_by").references("id").inTable("users").onDelete("CASCADE"); // görevi oluşturan kullanıcı
        table.timestamps(true, true);
    });

    // TASK_ASSIGNEES TABLOSU (bir göreve atanmış kullanıcılar)
    await knex.schema.createTable("task_assignees", (table) => {
        table.increments("id").primary();
        table.uuid("task_id").references("id").inTable("tasks").onDelete("CASCADE");
        table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE");
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("task_assignees");
    await knex.schema.dropTableIfExists("tasks");
    await knex.schema.dropTableIfExists("users");
};
