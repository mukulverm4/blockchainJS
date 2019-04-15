const BlockChain =require('./Blockchain');
const TxnBlock = require('./TransactionBlock');
const Txn = require('./Transaction');

let config = {};
config.difficulty = 2;
config.miningReward = 2;
let testCoin = new BlockChain(config);

testCoin.createTransaction(new Txn('A1','A2',100));
testCoin.createTransaction(new Txn('A2','A1',20));

testCoin.minePendingTransaction('M1');

testCoin.createTransaction(new Txn('A1','A2',10));
testCoin.createTransaction(new Txn('A2','A1',30));
testCoin.minePendingTransaction('A1');

console.log('M1 balance => ', testCoin.getAddressBalance('M1'));
console.log('A1 balance => ', testCoin.getAddressBalance('A1'));
console.log('A2 balance => ', testCoin.getAddressBalance('A2'));