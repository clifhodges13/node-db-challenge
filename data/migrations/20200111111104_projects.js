
exports.up = async function(knex) {
  await knex.schema.createTable('Projects', tbl => {
    tbl.increments().primary();
    tbl.text('Name', 64)
      .unique()
      .notNullable();
    tbl.text('Description');
    tbl.boolean('Completed')
      .notNullable()
      .defaultTo(false);
  })
  await knex.schema.createTable('Resources', tbl => {
    tbl.increments().primary();
    tbl.text('Name', 64)
      .unique()
      .notNullable();
    tbl.text('Description');
  })
  await knex.schema.createTable('Tasks', tbl => {
    tbl.increments().primary();
    tbl.text('Description').notNullable();
    tbl.text('Notes');
    tbl.boolean('Completed')
      .notNullable()
      .defaultTo(false);
    tbl.integer('Project_Id')
      .notNullable()
      .references('id')
      .inTable('Projects')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
  await knex.schema.createTable('Projects_Resources', tbl => {
    tbl.integer('Project_Id')
      .notNullable()
      .references('id')
      .inTable('Projects')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.integer('Resource_Id')
      .notNullable()
      .references('id')
      .inTable('Resources')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.primary(['Project_Id', 'Resource_Id']);
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('Projects_Resources');
  await knex.schema.dropTableIfExists('Tasks');
  await knex.schema.dropTableIfExists('Resources');
  await knex.schema.dropTableIfExists('Projects');
};
