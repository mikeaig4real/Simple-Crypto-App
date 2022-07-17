// the block class is used to create a block.
const Block = require('./Block');

// create a class called BlockChain that has the following properties:
class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()]; // create an array of blocks
        this.difficulty = 2; // difficulty of the block chain. difficulty is the number of zeros in the hash.
    }

    // create a genesis block which is the first block in the chain
    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis block", "0"); // index, timestamp, data, previousHash
    }

    // to get the latest block in the chain
    getLatestBlock() {
        return this.chain[this.chain.length - 1]; // get the last block in the chain
    }

    // add a new block to the chain
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash; // set the previous hash of the new block to the hash of the latest block
        newBlock.hash = newBlock.calculateHash(); // calculate the hash of the new block
        newBlock.mineBlock(this.difficulty); // mine the block
        this.chain.push(newBlock); // add the new block to the chain
    };

    // create a transaction
    createTransaction(transaction) { // transaction is an object with the following properties:
        const newTransaction = {
            id: transaction.id, // id is the id of the transaction
            amount: transaction.amount, // amount of the transaction
            sender: transaction.sender, // sender of the transaction
            recipient: transaction.recipient // recipient of the transaction
        };
        const newBlock = this.getLatestBlock(); // get the latest block
        newBlock.data.push(newTransaction); // add the transaction to the data of the latest block
        newBlock.hash = newBlock.calculateHash(); // calculate the hash of the latest block
        newBlock.previousHash = newBlock.previousHash; // set the previous hash of the latest block to the previous hash of the latest block
        newBlock.mineBlock(this.difficulty); // mine the latest block
        this.chain.push(newBlock); // add the latest block to the chain
    };

    // check if the chain is valid
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) { // loop through the chain
            const currentBlock = this.chain[i]; // get the current block
            const previousBlock = this.chain[i - 1]; // get the previous block

            if (currentBlock.hash !== currentBlock.calculateHash()) { // check if the hash of the current block is equal to the hash of the current block
                return false; // if not return false
            }

            if (currentBlock.previousHash !== previousBlock.hash) { // check if the previous hash of the current block is equal to the hash of the previous block
                return false; // if not return false
            }
        }

        // if the chain is valid return true
        return true;
    };

    // get the block with the given index
    getBlock(index) {
        return this.chain[index]; // get the block with the given index
    };

    // get the block with the given hash
    getBlockByHash(hash) {
        for (let i = 0; i < this.chain.length; i++) { // loop through the chain
            if (this.chain[i].hash === hash) { // check if the hash of the current block is equal to the hash of the block we are looking for
                return this.chain[i]; // if so return the block
            }
        }
    };

    // get the block with the given transaction
    getBlockByTransaction(transaction) {
        for (let i = 0; i < this.chain.length; i++) { // loop through the chain
            for (let j = 0; j < this.chain[i].data.length; j++) { // loop through the data of the current block
                if (this.chain[i].data[j].id === transaction.id) { // check if the current transaction's id is equal to the transaction we are looking for
                    return this.chain[i];
                }
            }
        }
    };

    // get the index of the block with the given hash
    getBlockIndexByHash(hash) {
        for (let i = 0; i < this.chain.length; i++) { // loop through the chain
            if (this.chain[i].hash === hash) { // check if the hash of the current block is equal to the hash of the block we are looking for
                return i; // if so return the index of the block
            }
        }
    };

    // get the index of the block with the given transaction
    getBlockIndex(transaction) {
        for (let i = 0; i < this.chain.length; i++) { // loop through the chain
            for (let j = 0; j < this.chain[i].data.length; j++) { // loop through the data of the current block
                if (this.chain[i].data[j].id === transaction.id) { // check if the current transaction's id is equal to the transaction we are looking for
                    return i;
                }
            }
        }
    };
};

module.exports = BlockChain;