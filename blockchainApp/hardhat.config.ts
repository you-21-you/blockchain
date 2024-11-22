import 'dotenv/config'
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.19"
      },
      // Seaportコントラクトが0.8.17依存のため下記を追加
      {
        version: "0.8.17",
        settings: {
          viaIR: true,
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      }
    ],
  },
  networks: {
    polygonAmoy: {
      url: process.env.ALCHEMY_AMOY_URL || "",
      accounts: process.env.AMOY_PRIVATE_KEY ? [process.env.AMOY_PRIVATE_KEY] : [],
    },
    localhost: {
      url: process.env.LOCAL_URL || "",
      accounts: process.env.LOCAL_PRIVATE_KEY ? [process.env.LOCAL_PRIVATE_KEY] : [],
    }
  },
  typechain: {
    outDir: 'frontend/types',
    target: 'ethers-v6',
    alwaysGenerateOverloads: false, // コントラクトにおける関数のオーバーロードがない場合でも、"deposit(uint256)"のような完全なシグネチャを生成するか
    // externalArtifacts: ['externalArtifacts/*.json'], // Typeファイルの生成に追加したい外部のArtifactsがある場合は指定する
  },
  
};

export default config;
