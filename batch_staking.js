const { SigningCosmWasmClient } = require("@cosmjs/cosmwasm-stargate");
const {  coins } = require("@cosmjs/launchpad");
const { DirectSecp256k1Wallet } = require("@cosmjs/proto-signing");


// 你的私钥数组

const privateKeys = [];
// 你的验证器地址
const validatorAddress = "cosmosvaloper1zqgheeawp7cmqk27dgyctd80rd8ryhqs6la9wc";

// RPC节点
const rpcEndpoint = "https://cosmoshub.validator.network/";

async function main() {
  // 对每个私钥进行操作
  for (const privateKey of privateKeys) {
    const wallet = await DirectSecp256k1Wallet.fromKey(new Uint8Array(privateKey.match(/.{1,2}/g).map(byte => parseInt(byte, 16))));
    const [account] = await wallet.getAccounts();
    console.log(account.address);
    const client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet);

    const msgDelegate = {
      delegatorAddress: account.address,
      validatorAddress: validatorAddress
    };
    const delegateAmount = {
        denom: "uatom",
        amount: "12000", //  1atom = 1000000uatom
      };

    const fee = {
      amount: coins(2500, "uatom"),
      gas: "500000", // 180k
    };

    const memo = "";

    const result = await client.delegateTokens(account.address, validatorAddress, delegateAmount, fee, memo);
    console.log(result);
  }
}

main().catch(console.error);

