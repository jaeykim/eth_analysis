var Web3 = require('web3');
var Trie = require('merkle-patricia-tree');
//var levelup = require('levelup');
//var leveldown = require('leveldown');
var level = require('level');
var rlp = require('rlp');
var assert = require('assert');
var Account = require('ethereumjs-account');

// Initialize Web3
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Connecting to the leveldb database
var db = level('/home/jaeykim/data/geth/chaindata');

/*
const promisify = (inner) =>
    new Promise((resolve, reject) =>
        inner((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    );
*/

//Adding the "stateRoot" value from the block so that we can inspect the state root at that block height.
//var root = '0x8c77785e3e9171715dd34117b047dffe44575c32ede59bde39fbf5dc074f2976';
//var root = '0xe9ff1c62491d4699147e02bf9e21e6d353b70579314a90491e9837e6c1d1ef4c';
//var root = '0xd7f8974fb5ac78d9ac099b9ad5018bedc2ce0a72dad1827a1709da30580f0544';

var defaultBlock = web3.eth.defaultBlock;
var root = web3.eth.getBlock(defaultBlock);
//var block = web3.eth.getBlock(222)

//console.log(block);

//console.log(defaultBlock);
console.log(root);

//Creating a trie object of the merkle-patricia-tree library
var trie = new Trie(db, root);
//console.log(trie);

/*
var address = '0xccc6b46fa5606826ce8c18fece6f519064e6130b';
trie.get(address, function (err, raw) {
    if (err) return cb(err)
    //Using ethereumjs-account to create an instance of an account
    var account = new Account(raw)
    console.log('Account Address: ' + address);
    //Using ethereumjs-util to decode and present the account balance
    console.log('Balance: ' + (new BN(account.balance)).toString());
})
*/

//Creating a nodejs stream object so that we can access the data
trie.createReadStream()
	.on('data', (data) => {
		console.log(data);
		//Turning on the stream (because the node js stream is set to pause by default)
		//console.log('key:' + data.key.toString('hex'));

 		//accouts are rlp encoded
  		//var decodedVal = rlp.decode(data.value);
  		//console.log(decodedVal);
	})
	.on('error', (err) => {
		console.log('Oh my!', err)
	})
	.on('end', () => {
		console.log('done reading!');
	})
