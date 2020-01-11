const express = require("express");
const db = require("./data/db-config");

const server = express();
server.use(express.json());

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 8888;

server.get('/', (req, res) => res.send('Welcome'));

// Get all projects
server.get('/projects', async (req, res) => {
  try {
    res.status(201).json(await db('Projects'))
  } catch(err) {
    res.status(500).json({message: 'Server error.'})
  }
});

// Post a new project
server.post('/projects', async (req, res) => {
  if (!req.body || !req.body.name) {
    return res.status(400).json({message: 'Please include a project name in your request.'})
  }
  try {
    res.status(201).json(await db('Projects').insert(req.body))
  } catch(err) {
    res.status(500).json({message: 'Server error.'})
  }
})

// Get all resources
server.get('/resources', async (req, res) => {
  try {
    res.status(200).json(await db('Resources'))
  } catch(err) {
    res.status(500).json({message: 'Server error.'})
  }
})

// Post a new resource
server.post('/resources', async (req, res) => {
  if (!req.body || !req.body.name) {
    return res.status(400).json({message: 'Please include a resource name in your request.'})
  }
  try {
    res.status(201).json(await db('Resources').insert(req.body))
  } catch(err) {
    res.status(500).json({message: 'Server error.'})
  }
})

server.listen(PORT, () => console.log(`Server is listening at ${HOST}:${PORT}`));