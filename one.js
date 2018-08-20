//引入bitcoin模組
const bitcoin = require("bitcoinjs-lib");


//選用regtest網路
const regtest = bitcoin.networks.testnet

//https://github.com/bitcoinjs/bip65 
const bip65 = require('bip65')

//輸入私鑰，教學用，請勿隨意公開私鑰
var privateKey = "cQZts3AqUD4UkSkNLpgbyYWFfgo67VZA5yi9Dd5UN2wE2Sm96SE6";

//產生公鑰跟私鑰
const keyPair = bitcoin.ECPair.fromWIF(privateKey,regtest);

//產生付款位址
const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
console.log(bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }));
const txb = new bitcoin.TransactionBuilder(regtest);


//用listunspent 取出最後一筆資料的txid
txb.addInput('a5da3c8baa0d65682bef56183fe2881cddc73c5cdcd330266a2ab2864bcea0ff', 0);

//用getnewaddress取得新的位址
txb.addOutput('2NGPALzjuYj2tRJMSTKRuDJMkHe1NC1dMnv', 25)

//交易簽名
txb.sign(0, keyPair); //第一個位置的是上一筆交易中的第一個支出，第二個欄位是我們的公鑰與私鑰

//取得交易序號
const transaction_01 = txb.build().toHex(); 
console.log(transaction_01);
