const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const {
    username
  } = request.headers;

  const user = users.find(user => user.username === username);

  if(!user){
    return response.status(404).json({error: "User not found!"});
  }

  request.user = user;

  return next();
}

app.post('/users', (request, response) => {
  const {
    username,
    name
  } = request.body;

  const userAlreadExists = users.find(user => user.username === username);

  if(userAlreadExists){
    return  response.status(400).json({ error: "User exists!!"});
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: [] 
  }

  users.push(user);

  return response.status(201).json(user);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const {
    user
  } = request;

  return response.json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const {
    title,
    deadline
  } = request.body;

  const {
    user
  } = request;

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(todo);

  return response.status(201).json(todo);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { id } = request.params;

  const { title, deadline } = request.body;

  const { user } = request;

  const todo = user.todos.findIndex(todo => todo.id === id);

  if(todo < 0){
    return response.status(404).json({error: "Todo not found!"});
  }

  user.todos[todo].title = title;
  user.todos[todo].deadline = deadline;

  return response.status(201).json(user.todos[todo]);
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { user } = request;

  const todo = user.todos.findIndex(todo => todo.id === id);

  if(todo < 0){
    return response.status(404).json({error: "Todo not found!"});
  }

  user.todos[todo].done = true;

  return response.status(201).json(user.todos[todo]);
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { user } = request;

  const todo = user.todos.findIndex(todo => todo.id === id);

  if(todo < 0){
    return response.status(404).json({error: "Todo not found!"});
  }

  user.todos.splice(todo, 1);

  return response.status(204).send();
});

module.exports = app;