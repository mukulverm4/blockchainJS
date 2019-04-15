const BlockChain =require('./Blockchain');
const Block = require('./Block');

let config = {};
config.difficulty = 4;
let testCoin = new BlockChain(config);

console.log("Mining Block 1");

testCoin.addBlock(new Block(1,(new Date()).getTime()),{amount:4});