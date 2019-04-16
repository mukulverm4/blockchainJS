const SHA256 = require('crypto-js/sha256');

module.exports =  class TransactionBlock{

    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.currentHash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        //using SHA-256
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        console.log("in mineBlock with diff ", difficulty);
        while(this.currentHash.substring(0,difficulty) !== new Array(difficulty+1).join("0")){
            // console.log("nonce => ", this.nonce);
            // console.log("current hash  => ", this.currentHash);
            // console.log("difficulty => ", new Array(difficulty+1).join("0"))
            this.nonce++;
            this.currentHash = this.calculateHash();
        }
        console.log("Block mined => ",this.currentHash);
    }

    hasValidTransactions(){
        for(const txn of this.transactions){
            if(!txn.isValid())
                return false;
        }
        return true;
    }

}