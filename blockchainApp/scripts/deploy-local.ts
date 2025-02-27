import { ethers } from "hardhat";

async function main() {
  // const myToken = await ethers.deployContract("MyToken");
  // myToken.waitForDeployment();
  // console.log(`MyToken deployed to: ${myToken.target}`);

  // const myERC20 = await ethers.deployContract("MyERC20");
  // await myERC20.waitForDeployment();
  // console.log(`MyERC20 deployed to: ${myERC20.target}`);

  //*** */ // NFT Contractをデプロイする
  const bipNFT = await ethers.deployContract("bipNFT", ['bipNFT', 'bipNFT']);
  await bipNFT.waitForDeployment();
  console.log(`bipNFT deployed to: ${bipNFT.target}`);

  // NFT Contractをデプロイする
  // const New_myERC721 = await ethers.deployContract("New_MyERC721", ['New_MyERC721', 'New_MYERC721']);
  // await New_myERC721.waitForDeployment();
  // console.log(`New_myERC721 deployed to: ${New_myERC721.target}`);

  // ConduitControllerコントラクトをデプロイする
  // // Seaportコントラクトのデプロイに、ConduitControllerのアドレスが必要なため先にデプロイ
  // const conduitController = await ethers.deployContract("ConduitController");
  // await conduitController.waitForDeployment();
  // const conduitControllerAddress = await conduitController.getAddress()
  // // // Seaportコントラクトをデプロイ
  // const seaport = await ethers.deployContract("Seaport", [conduitControllerAddress]);
  // await seaport.waitForDeployment();
  // console.log(`Seaport deployed to: ${seaport.target}`);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
