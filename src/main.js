const BlockChain =require('./Blockchain');
const TxnBlock = require('./TransactionBlock');
const Transaction = require('./Transaction');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

let config = {};
config.difficulty = 2;
config.miningReward = 20;
let testCoin = new BlockChain(config);

const myKey = ec.keyFromPrivate('3ae988b1fe775aedeced54be2b37d474f5f4b8432d322bf34ed18c8304e28ff1')
const myWalletAddress = myKey.getPublic('hex');

const txn1 = new Transaction(myWalletAddress, 'pubKey', 5);
txn1.calculateHash();
txn1.isValid();
txn1.signTransaction(myKey);
testCoin.addTransaction(txn1);

testCoin.minePendingTransaction(myWalletAddress);
console.log(testCoin.getAddressBalance(myWalletAddress));


// testCoin.createTransaction(new Txn('A1','A2',100));
// testCoin.createTransaction(new Txn('A2','A1',20));

// testCoin.minePendingTransaction('M1');

// testCoin.createTransaction(new Txn('A1','A2',10));
// testCoin.createTransaction(new Txn('A2','A1',30));
// testCoin.minePendingTransaction('A1');

// console.log('M1 balance => ', testCoin.getAddressBalance('M1'));
// console.log('A1 balance => ', testCoin.getAddressBalance('A1'));
// console.log('A2 balance => ', testCoin.getAddressBalance('A2'));