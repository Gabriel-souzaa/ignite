const express = require('express');

const app = express();

/*
  Receber JSON
*/
app.use(express.json());


/*
  Métodos HTTP
*/
app.get("/", (request, response) => {
  return response.json("Hello mundo");
});

app.post("/courses", (request, response) => {
  return response.json(["1", "2", "3"]);
});

app.put("/courses/:id", (request, response) => {
  return response.json(["4", "4", "1"]);
});

app.patch("/courses/:id", (request, response) => {
  return response.json(["4", "4", "1"]);
});

app.patch("/courses/:id", (request, response) => {
  return response.json(["4"]);
});

/*
  Tipos de parametros
*/
app.put("/courses/:id", (request, response) => {
  //Route Params
  const { id } = request.params;

  //Query Params
  const { query1, query2 } = request.query;

  //Body Params
  const { field1, field2 } = request.body;
});

app.listen(3333);