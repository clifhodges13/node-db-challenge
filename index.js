const express = require("express");
const db = require("./data/db-config");

const server = express();
server.use(express.json());

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 8888;

server.get('/', (req, res) => res.send('Welcome'));

// Get all projects
server.get('/projects', async (req, res) => {
  const projects = await db('Projects')
  try {
    res.status(200).json(projects.map(proj => {
      return {
        id: proj.id,
        Name: proj.Name,
        Description: proj.Description,
        Completed: `${proj.Completed === 1 ? 'true' : 'false'}`
      }
    }))
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

// Get all tasks
server.get('/tasks', async (req, res) => {
  try {
    const tasks = await db('Tasks')
    res.status(200).json(tasks.map(task => {
      return {
        id: task.id,
        Description: task.Description,
        Notes: task.Notes,
        Project_Id: task.Project_Id,
        Completed: `${task.Completed === 0 ? 'false': 'true'}`
      }
    }))
  } catch(err) {
    res.status(500).json({message: 'Server error.'})
  }
})

// Post a new task
server.post('/tasks', async (req, res) => {
  if (!req.body.description) {
    res.status(400).json({ message: 'You must include a task description in your post request body.' })
  } else if (!req.body.project_id) {
    res.status(400).json({ message: 'You must include the project id associated with your task in your post request body.' })
  }
  try {
    res.status(201).json(await db('Tasks').insert(req.body))
  } catch(err) {
    res.status(500).json({message: 'Server error.'})
  }
})

// Get a Project by Id
server.get('/projects/:id', async (req, res) => {
  try {
    // const project_id = req.params.id
    // const project = await db('Projects').where({ id: project_id })
    // if (!project) {
    //   res.status(404).json({ message: 'The project with the specified id does not exist.' })
    // }
    // const tasks = await db('Tasks').where({ Project_Id: id })
    // const resources = await db('Projects_Resources').where({ Project_Id: id })
    // console.log(project)
    // res.status(200).json({
    //   project: {
    //     id: project.id,
    //     name: project.Name,
    //     description: project.Description,
    //     Completed: `${project.Completed === 0 ? 'false': 'true'}`,
    //     tasks,
    //     resources
    //   }
    // })
    const project = await db('Projects').where({ id: req.params.id })
    res.json(project)
  } catch(err) {
    res.status(500).json({message: 'Server error.'})
  }
})

server.listen(PORT, () => console.log(`Server is listening at ${HOST}:${PORT}`));