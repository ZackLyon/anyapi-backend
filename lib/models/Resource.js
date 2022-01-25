const pool = require('../utils/pool.js');

module.exports = class Resource {
  id;
  category;
  title;
  description;
  url;

  constructor(resource) {
    this.id = resource.id;
    this.category = resource.category;
    this.title = resource.title;
    this.description = resource.description;
    this.url = resource.url;
  }

  static async insert({ category, title, description, url }) {
    const { rows } = await pool.query(
      'INSERT INTO resources(category, title, description, URL) VALUES ($1, $2, $3, $4) RETURNING *;',
      [category, title, description, url]
    );

    return new Resource(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM resources;');

    return new Resource(rows[0]);
  }
};
