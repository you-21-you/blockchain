import Web3 from "web3";
import { AbiItem } from "web3-utils";
import contractArtifact from "../artifacts/contracts/nfttest.sol/nfttest.json";

// ADDRESS, KEY and URL are examples.
const CONTRACT_ADDRESS: string = "メモしておいたアドレス";
const PUBLIC_KEY: string = "架空の金持ちアカウント#0のPublic Key";
const PROVIDER_URL: string = "http://localhost:8545";

async function viewNFT(): Promise<void> {
  try {
    const web3 = new Web3(PROVIDER_URL);

    // コントラクトを設定
    const nftContract = new web3.eth.Contract(
      contractArtifact.abi as AbiItem[], // ABI の型を明示
      CONTRACT_ADDRESS
    );

    // `balanceOf` メソッドを呼び出して、NFTの保有数を取得
    const balance: string = await nftContract.methods.balanceOf(PUBLIC_KEY).call();

    console.log(`Address ${PUBLIC_KEY} owns ${balance} NFTs.`);
  } catch (error) {
    console.error("Error viewing NFTs:", error);
  }
}

viewNFT();
