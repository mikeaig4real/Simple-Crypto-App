require('dotenv').config(); // a file that contains the configuration of the app
const randomstring = require('random-string'); // a package that generates random strings
const express = require('express'); // create a new express app
const app = express(); // create a new express app
const Blockchain = require('./utility/BlockChain'); // Blockchain class
const Block = require('./utility/Block'); // Block class
const preciousCoin = new Blockchain(); // my cryptocurrency chain


// middleware
app.use(express.json()); // a body parser middleware
app.use(express.urlencoded({ extended: true }));

// logger

// for logging the requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// not found

// for request urls not found
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// routes
// add a new block to the chain
app.post('/api/addBlock', async (req, res) => {
  const { data } = req.body;
  const newBlock = new Block(data);
  preciousCoin.addBlock(newBlock);
  res.send(newBlock);
});

// create a transaction
app.post('/api/createTransaction', async (req, res) => {
  const { amount, sender, recipient } = req.body;
  const newTransaction = {
    id: randomstring.generate(10),
    amount,
    sender,
    recipient,
  };
  preciousCoin.createTransaction(newTransaction);
  res.send(newTransaction);
});

// initialize port
const port = process.env.PORT || 8000;


// listen to the port
const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

// start the server
start();
