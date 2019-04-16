const Block = require('./Block');
const TransactionBlock = require('./TransactionBlock');
const Transaction = require('./Transaction');

module.exports =  class BlockChain{
    constructor(config){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = config.difficulty;
        this.pendingTransactions = [];
        this.miningReward = config.miningReward;
    }

    createGenesisBlock(){
        let currentDate = new Date();
        return new TransactionBlock(currentDate.getTime(), "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().currentHash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    minePendingTransaction(miningRewardAddress){
        let txnBlock = new TransactionBlock((new Date).getTime(),this.pendingTransactions);
        txnBlock.mineBlock(this.difficulty);
        this.chain.push(txnBlock);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    addTransaction(transaction){
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must contain from and to address!')
        }
        if(!transaction.isValid()){
            throw new Error('Cannot add invalid transaction to the chain!');
        }
        this.pendingTransactions.push(transaction);
    }

    getAddressBalance(address){
        let balance = 0;

        for(const block of this.chain){
            for(const txn of block.transactions){
   
                if(txn.fromAddress === address) 
                    balance -= txn.amount;
                if(txn.toAddress === address)
                    balance += txn.amount;
            }
        }
        return balance;
    }

    isChainValid(){
        for (let i = 1;i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.currentHash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousBlock !== previousBlock.hash){
                return false;
            }
            
            if(!currentBlock.hasValidTransactions()){
                return false;
            }
        }
        return true;
    }
}