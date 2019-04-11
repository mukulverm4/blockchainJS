const SHA256 = require('crypto-js/sha');

class Block{

    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.currentHash = calculateHash();
    }

    calculateHash(){
        //using SHA-256
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        let currentDate = new Date();
        return new Block(0, currentDate.getTime(), "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().currentHash;
        newBlock.currentHash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    
}