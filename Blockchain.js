const Block =require('./Block');

module.exports =  class BlockChain{
    constructor(config){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = config.difficulty;
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
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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
        }
        return true;
    }
}