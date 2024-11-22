import { config } from "dotenv";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from "hardhat";
import { Contract } from "ethers";

// 環境変数の読み込み
config();

const API_URL = process.env.API_URL || "";
const PUBLIC_KEY = process.env.PUBLIC_KEY || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

if (!API_URL || !PUBLIC_KEY || !PRIVATE_KEY) {
  throw new Error("Environment variables API_URL, PUBLIC_KEY, or PRIVATE_KEY are missing.");
}

async function main() {
  // プライベートキーでウォレットを作成
  const wallet = new ethers.Wallet(PRIVATE_KEY);
  const provider = new ethers.JsonRpcProvider(API_URL);
  const signer = wallet.connect(provider);

  // コントラクト情報の読み込み
  const contractAddress = "0x120407c770965330848b6981114a4ef3F6aF3aBa"; // コントラクトアドレスを指定
  const nftContract = new ethers.Contract(
    contractAddress,
    [
      // ABIの一部だけ記載、必要に応じて完全なABIを追加してください
      "function safeMint(address to, string memory uri) public returns (uint256)"
    ],
    signer
  );

  // NFTをミントするトークンURI
  const tokenURI = "https://gateway.pinata.cloud/ipfs/QmVSPrDxWvq9atqfBxtT3zFuzzern9czR44sqzuuCDeaNv"; 

  try {
    // safeMint 関数の呼び出し
    const tx = await nftContract.safeMint(PUBLIC_KEY, tokenURI);
    console.log("Minting transaction sent. Hash:", tx.hash);

    // トランザクションの確認
    const receipt = await tx.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
    console.log("Token minted with tokenId:", receipt.events?.[0].args?.tokenId.toString());
  } catch (error) {
    console.error("Error during minting:", error);
  }
}

// スクリプト実行
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
