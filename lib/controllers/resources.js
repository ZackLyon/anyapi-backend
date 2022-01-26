const { Router } = require('express');
const Resource = require('../models/Resource.js');

module.exports = Router()
  .post('/', async (req, res) => {
    const resource = await Resource.insert(req.body);

    res.json(resource);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const resource = await Resource.getById(id);

    res.json(resource);
  })

  .get('/', async (req, res) => {
    const resource = await Resource.getAll();

    res.json(resource);
  })

  .patch('/:id', async (req, res) => {
    const { id } = req.params;

    const resource = await Resource.update(id, req.body);

    res.json(resource);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    const resource = await Resource.delete(id);

    res.json(resource);
  });
