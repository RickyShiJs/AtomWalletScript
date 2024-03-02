const { SigningCosmWasmClient } = require("@cosmjs/cosmwasm-stargate");
const {  coins } = require("@cosmjs/launchpad");
const { DirectSecp256k1Wallet } = require("@cosmjs/proto-signing");


// 你的私钥数组
const privateKeys = [];

// 你的验证器地址
const validatorAddress = "osmovaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4ep88n0y4";

// RPC节点
const rpcEndpoint = "https://rpc.osmosis.zone";

async function main() {
  // 对每个私钥进行操作
  for (const privateKey of privateKeys) {
    const wallet = await DirectSecp256k1Wallet.fromKey(new Uint8Array(privateKey.match(/.{1,2}/g).map(byte => parseInt(byte, 16))), prefix="osmo");
    const [account] = await wallet.getAccounts();
    console.log(account.address);
    const client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet);

    const msgDelegate = {
      delegatorAddress: account.address,
      validatorAddress: validatorAddress
    };
    const delegateAmount = {
        denom: "uosmo",
        amount: "20000001", //  1osmo = 1000000uosmo
      };

    const fee = {
      amount: coins(600, "uosmo"),
      gas: "200000", // 180k
    };

    const memo = "";

    const result = await client.delegateTokens(account.address, validatorAddress, delegateAmount, fee, memo);
    console.log(result);
  }
}

main().catch(console.error);

