import "@nomicfoundation/hardhat-toolbox";
import "@tableland/hardhat";
import * as dotenv from "dotenv";
import fs from "fs";
import "hardhat-dependency-compiler";
import "hardhat-gas-reporter";
import {HardhatUserConfig} from "hardhat/config";
import path from "path";

dotenv.config();

const {
  PRIVATE_KEY,
  INFURA_API_KEY,
  ETHERSCAN_API_KEY,
  GAS_REPORT,
  ROOTSTACK_API_KEY,
  COINMARKETCAP_API_KEY,
} = process.env;

// config for loading tasks files
const SKIP_LOAD = process.env.SKIP_LOAD === "true";
if (!SKIP_LOAD) {
  const taskPaths = [""];
  taskPaths.forEach((folder) => {
    const tasksPath = path.join(__dirname, "tasks", folder);
    fs.readdirSync(tasksPath)
      .filter((_path) => _path.includes(".ts"))
      .forEach((task) => {
        require(`${tasksPath}/${task}`);
      });
  });
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 500,
      },
    },
  },
  /* */
  dependencyCompiler: {
    paths: [
      "./../../../node_modules/@tableland/evm/contracts/TablelandTables.sol",
    ],
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    holesky: {
      url: `https://holesky.infura.io/v3/${INFURA_API_KEY}`,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    hederaTestnet: {
      url: "https://testnet.hashio.io/api" || "",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    rskTestnet: {
      url: `https://rpc.testnet.rootstock.io/${ROOTSTACK_API_KEY}`,
      chainId: 31,
      gasPrice: 60000000,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    galadrielDevnet: {
      url: `https://devnet.galadriel.com`,
      chainId: 696969,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    chilizTestnet: {
      url: `https://spicy-rpc.chiliz.com/`,
      chainId: 88882,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    morphTestnet: {
      url: "https://rpc-quicknode-holesky.morphl2.io" || "",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      gasPrice: 2000000000, // 2 gwei in wei
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY!,
      morphTestnet: "anything",
    },
    customChains: [
      {
        network: "morphTestnet",
        chainId: 2810,
        urls: {
          apiURL: "https://explorer-api-holesky.morphl2.io/api? ",
          browserURL: "https://explorer-holesky.morphl2.io/",
        },
      },
    ],
  },
  gasReporter: {
    enabled: GAS_REPORT ? true : false,
    currency: "JPY",
    gasPrice: 20,
    token: "ETH",
    coinmarketcap: COINMARKETCAP_API_KEY,
    gasPriceApi:
      "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
  },
  localTableland: {
    silent: false,
    verbose: false,
  },
};

export default config;
