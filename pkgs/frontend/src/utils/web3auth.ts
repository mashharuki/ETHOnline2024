import {CHAIN_NAMESPACES, WEB3AUTH_NETWORK} from "@web3auth/base";
import {EthereumPrivateKeyProvider} from "@web3auth/ethereum-provider";
import {Web3Auth} from "@web3auth/modal";

const clientId =
  "BEn_d-9zlluNwgNIuY7HPUX-Ez13QTFqMHXyBk9b7DMkpTkkejnGCv73y2laaKD3lJQl72Dy8hTLc7KGYDuSueM";

export const chainConfig = {
  sepolia: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xaa36a7",
    rpcTarget: "https://rpc.ankr.com/eth_sepolia",
    // Avoid using public rpcTarget in production.
    // Use services like Infura, Quicknode etc
    displayName: "Ethereum Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  fhenix: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x7a31c7",
    rpcTarget: "https://api.helium.fhenix.zone",
    displayName: "Fhenix Helium",
    blockExplorerUrl: "https://explorer.helium.fhenix.zone",
    ticker: "tFHE",
    tickerName: "tFHE",
    logo: "https://img.cryptorank.io/coins/fhenix1695737384486.png",
  },
  hederaTestnet: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x128",
    rpcTarget: "https://testnet.hashio.io/api",
    displayName: "Hedera Testnet",
    blockExplorerUrl: "https://hashscan.io/testnet/",
    ticker: "HBAR",
    tickerName: "HBAR",
    logo: "https://cryptologos.cc/logos/hedera-hbar-logo.png?v=033",
  },
  morphTestnet: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xafa",
    rpcTarget: "https://rpc-holesky.morphl2.io",
    displayName: "Morph Holesky",
    blockExplorerUrl: "https://explorer-holesky.morphl2.io/",
    ticker: "ETH",
    tickerName: "ETH",
    logo: "https://morphl2brand.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Ffcab2c10-8da9-4414-aa63-4998ddf62e78%2F64fbcffc-0e7c-45e1-8900-1bb36dc90924%2FFrame_1597882262.png?table=block&id=0e6a22c3-ed4e-4c25-9575-11b95b1eade9&spaceId=fcab2c10-8da9-4414-aa63-4998ddf62e78&width=2000&userId=&cache=v2",
  },
  rscTestnet: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1f",
    rpcTarget: "https://public-node.testnet.rsk.co",
    displayName: "Rootstock Testnet",
    blockExplorerUrl: "https://explorer.testnet.rootstock.io/",
    ticker: "tRBTC",
    tickerName: "tRBTC",
    logo: "https://pbs.twimg.com/profile_images/1592915327343624195/HPPSuVx3_400x400.jpg",
  },
  baseSepolia: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x14A34", // hex of 84532
    rpcTarget: "https://sepolia.base.org",
    // Avoid using public rpcTarget in production.
    // Use services like Infura, Quicknode etc
    displayName: "Base Sepolia",
    blockExplorerUrl: "https://sepolia-explorer.base.org",
    ticker: "ETH",
    tickerName: "ETH",
    logo: "https://github.com/base-org/brand-kit/blob/main/logo/symbol/Base_Symbol_Blue.svg",
  },
  chilizTestnet: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x15B32",
    rpcTarget: "https://spicy-rpc.chiliz.com",
    displayName: "Chiliz Spicy",
    blockExplorerUrl: "https://testnet.chiliscan.com",
    ticker: "CHZ",
    tickerName: "CHZ",
    logo: "https://github.com/base-org/brand-kit/blob/main/logo/symbol/Base_Symbol_Blue.svg",
  },
  galadrielDevnet: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xAA289",
    rpcTarget: "https://devnet.galadriel.com",
    displayName: "Galadriel Devnet",
    blockExplorerUrl: "https://explorer.galadriel.com",
    ticker: "GAL",
    tickerName: "GAL",
    logo: "https://github.com/base-org/brand-kit/blob/main/logo/symbol/Base_Symbol_Blue.svg",
  },
};

export const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig: chainConfig.galadrielDevnet,
  },
});

export const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});
