const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

/*
  Middleware
*/
function verifyIfExistsAccount(request, response, next){
  const { cpf } = request.headers;

  const customer = customers.find(customer => customer.cpf === cpf);

  if(!customer){
    return response.status(400).json({error: "Customer not found"});
  }

  request.customer = customer;

  return next();
}

function getBalance(statement){
  const balance = statement.reduce((acc, oparation) => {
    if(oparation.type === 'credit'){
      return acc + oparation.amount;
    }else{
      return acc - oparation.amount;
    }
  }, 0);

  return balance;
}

/*
  Accounts
*/
app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if(customerAlreadyExists){
    return response.status(400).json({
      error: "Cpf existente"
    });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  return response.status(201).send();
});

app.put("/account", verifyIfExistsAccount, (request, response) => {
  const { name } = request.body;

  const { customer } = request;

  customer.name = name;

  return response.status(201).send();
});

app.get("/account", verifyIfExistsAccount, (request, response) => {
  const { customer } = request;
  return response.json(customer);
});

app.delete("/account", verifyIfExistsAccount, (request, response) => {
  const { customer } = request;
  
  customers.splice(customer, 1);

  return response.status(200).json(customers);
});

/*
  Withdraws and deposits
*/
app.post("/deposit", verifyIfExistsAccount, (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;

  const statementOparation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  }
  customer.statement.push(statementOparation);

  return response.status(201).send();
});

app.post("/withdraw", verifyIfExistsAccount, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if(balance < amount){
    return response.status(400).json({
      error: "Insufficient funds!"
    });
  }

  const statementOparation = {
    amount,
    created_at: new Date(),
    type: "debit"
  }

  customer.statement.push(statementOparation);

  return response.status(201).send();
});

/*
  Statemants
*/
app.get("/statement/date", verifyIfExistsAccount, (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter(
    (statement) => 
    statement.created_at.toDateString() ===
    new Date(dateFormat).toDateString()
  );

  return response.json(statement);
});

app.get("/statement", verifyIfExistsAccount, (request, response) => {
  const { customer } = request;

  return response.json(customer);
});

/*
  Balance
*/
app.get("/balance", verifyIfExistsAccount, (request, respose) => {
  const {customer} = request;
  const balance = getBalance(customer.statement);
  return respose.json(balance);
});

app.listen(3333);