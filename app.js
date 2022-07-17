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


// routes
// add a new block to the chain

app.get('/api/crypto', (req, res) => {
  res.send('Welcome to Precious Coin Crypto!');
})



app.post('/api/crypto/addBlock', async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({error: 'No data'});
  };
  const newBlock = new Block(data);
  preciousCoin.addBlock(newBlock);
  res.send(newBlock);
});

// create a transaction
app.post('/api/crypto/createTransaction', async (req, res) => {
  const { amount, sender, recipient } = req.body;
  if (!amount || !sender || !recipient) {
    return res.status(400).json({error: 'No data'});
  };
  const newTransaction = {
    id: randomstring.generate(10),
    amount,
    sender,
    recipient,
  };
  preciousCoin.createTransaction(newTransaction);
  res.send(newTransaction);
});

// not found

// for request urls not found
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
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
