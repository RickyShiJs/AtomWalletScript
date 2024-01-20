const { DirectSecp256k1Wallet } = require("@cosmjs/proto-signing");
const { SigningCosmWasmClient } = require("@cosmjs/cosmwasm-stargate");
const {  coins } = require("@cosmjs/launchpad");
// 你sender的私钥
const privateKey = "";
const privateKeyUint8Array = new Uint8Array(privateKey.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
// 你sender的地址
const myAddress = "";
// 100个接收地址
const recipientAddresses = [];


// 转账金额
const amount = {
  denom: "utia",
  amount: "1000000", // 1atom = 1000000uatom

};
const fee = {
  amount: coins(500, "utia"),
  gas: "180000", // 180k gas limit
};
async function main() {
  const wallet = await DirectSecp256k1Wallet.fromKey(privateKeyUint8Array, 'celestia');
  const client = await SigningCosmWasmClient.connectWithSigner("https://public-celestia-rpc.numia.xyz", wallet);
  for (var i=1;i<100;i++) {
    console.log(myAddress);
    console.log(recipientAddresses[i]);
    const result = await client.sendTokens(myAddress, recipientAddresses[i], [amount], fee);
    console.log(`Transaction sent with ID ${result.transactionHash}`);
  }
}

main().catch(console.error);
