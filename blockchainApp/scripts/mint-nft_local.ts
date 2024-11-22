import { config } from "dotenv";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from "hardhat";
import { Contract } from "ethers";

// 環境変数の読み込み
config();

const LOCAL_API_URL = process.env.LOCAL_API_URL || "";
const LOCAL_PUBLIC_KEY = process.env.LOCAL_PUBLIC_KEY || "";
const LOCAL_PRIVATE_KEY = process.env.LOCAL_PRIVATE_KEY || "";

if (!LOCAL_API_URL || !LOCAL_PUBLIC_KEY || !LOCAL_PRIVATE_KEY) {
  throw new Error("Environment variables API_URL, PUBLIC_KEY, or PRIVATE_KEY are missing.");
}

async function main() {
  // プライベートキーでウォレットを作成
  const wallet = new ethers.Wallet(LOCAL_PRIVATE_KEY);
  const provider = new ethers.JsonRpcProvider(LOCAL_API_URL);
  const signer = wallet.connect(provider);

  // コントラクト情報の読み込み
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // コントラクトアドレスを指定
  const nftContract = new ethers.Contract(
    contractAddress,
    [
      // ABIの一部だけ記載、必要に応じて完全なABIを追加してください
      "function safeMint(address to, string memory uri) public returns (uint256)"
    ],
    signer
  );

  // NFTをミントするトークンURI
  const tokenURI = "QmVSPrDxWvq9atqfBxtT3zFuzzern9czR44sqzuuCDeaNv"; 

  try {
    // safeMint 関数の呼び出し
    const tx = await nftContract.safeMint(LOCAL_PUBLIC_KEY, tokenURI);
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
