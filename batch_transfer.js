const { DirectSecp256k1Wallet } = require("@cosmjs/proto-signing");
const { SigningCosmWasmClient } = require("@cosmjs/cosmwasm-stargate");
const {  coins } = require("@cosmjs/launchpad");
// 你的私钥
const privateKey = "";
const privateKeyUint8Array = new Uint8Array(privateKey.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
// 你的发送地址
const myAddress = "";
// 100个接收地址数组
const recipientAddresses = ['','']

// 转账金额
const amount = {
  denom: "uatom",
  amount: "20000", // 1atom = 1000000uatom

};
const fee = {
  amount: coins(900, "uatom"),
  gas: "180000", // 180k
};
async function main() {
  const wallet = await DirectSecp256k1Wallet.fromKey(privateKeyUint8Array);
  const client = await SigningCosmWasmClient.connectWithSigner("https://cosmoshub.validator.network/", wallet);

  for (const recipientAddress of recipientAddresses) {
    const result = await client.sendTokens(myAddress, recipientAddress, [amount], fee);
    console.log(`Transaction sent with ID ${result.transactionHash}`);
  }
}

main().catch(console.error);
