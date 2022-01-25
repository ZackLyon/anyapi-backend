const { Router } = require('express');
const Resource = require('../models/Resource.js');

module.exports = Router()
  .post('/', async (req, res) => {
    const resource = await Resource.insert(req.body);

    res.json(resource);
  })

  .get('/', async (req, res) => {
    const resource = await Resource.getAll();

    res.json(resource);
  });
