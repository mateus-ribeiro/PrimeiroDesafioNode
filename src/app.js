const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const { title, url, techs } = request.body;

  const index = repositories.findIndex(repository => repository.id === id);

  if(index < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  const newRepo = {
    id,
    title, 
    url, 
    techs,
    likes: repositories[index].likes
  };

  repositories[index] = newRepo;

  return response.json(newRepo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repository => repository.id === id);

  if(index < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories.splice(index, 1);

  return response.json({ message: 'Repositorio excluido com sucesso' });
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repository => repository.id === id);

  if(index < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories[index].likes = repositories[index].likes + 1;

  return response.json(repositories[index]);
});

module.exports = app;
