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

    return rows.map((row) => new Resource(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM resources WHERE id=$1;', [
      id,
    ]);

    if (!rows[0]) return null;
    return new Resource(rows[0]);
  }

  static async update(id, updated) {
    const existingResource = await this.getById(id);

    if (!existingResource) throw new Error(`Not valid ${id}`);

    const propertyKeys = ['category', 'title', 'description', 'url'];

    const verifiedProperties = propertyKeys.map((key) =>
      Object.prototype.hasOwnProperty.call(updated, key)
        ? [key, updated[key]]
        : [key, existingResource[key]]
    );

    const updatedKeys = Object.fromEntries(verifiedProperties);

    const { rows } = await pool.query(
      'UPDATE resources SET category=$1, title=$2, description=$3, url=$4 WHERE id=$5 RETURNING *',
      [
        updatedKeys.category,
        updatedKeys.title,
        updatedKeys.description,
        updatedKeys.url,
        id,
      ]
    );

    return new Resource(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM resources WHERE id=$1 RETURNING *;',
      [id]
    );

    if (!rows[0]) return null;
    return new Resource(rows[0]);
  }
};
