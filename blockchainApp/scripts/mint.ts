import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { TransactionConfig } from "web3-core";

// 型情報を追加
const CONTRACT_ADDRESS: string = "メモしておいたアドレス";
const PUBLIC_KEY: string = "架空の金持ちアカウント#0のPublic Key";
const PRIVATE_KEY: string = "架空の金持ちアカウント#0のPrivate Key";
const PROVIDER_URL: string = "http://localhost:8545";

async function mintNFT(): Promise<void> {
  try {
    const web3 = new Web3(PROVIDER_URL);

    // コントラクト情報を読み込む
    const contract = require("../artifacts/contracts/nfttest.sol/nfttest.json");
    const nftContract = new web3.eth.Contract(contract.abi as AbiItem[], CONTRACT_ADDRESS);

    // トランザクションに必要なnonceを取得
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

    // トランザクション設定
    const tx: TransactionConfig = {
      from: PUBLIC_KEY,
      to: CONTRACT_ADDRESS,
      nonce: nonce,
      gas: 500000,
      data: nftContract.methods.mint(PUBLIC_KEY).encodeABI(),
    };

    // トランザクションを署名
    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

    if (signedTx.rawTransaction) {
      // 署名済みトランザクションを送信
      web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        .on("receipt", (receipt) => {
          console.log("Transaction successful with hash:", receipt.transactionHash);
        })
        .on("error", (err) => {
          console.error("Transaction error:", err);
        });
    } else {
      console.error("Failed to create raw transaction.");
    }
  } catch (error) {
    console.error("An error occurred while minting NFT:", error);
  }
}

mintNFT();
