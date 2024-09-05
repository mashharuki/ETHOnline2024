import {CHAIN_NAMESPACES, WEB3AUTH_NETWORK} from "@web3auth/base";
import {EthereumPrivateKeyProvider} from "@web3auth/ethereum-provider";
import {Web3Auth} from "@web3auth/modal";

const clientId =
  "BEn_d-9zlluNwgNIuY7HPUX-Ez13QTFqMHXyBk9b7DMkpTkkejnGCv73y2laaKD3lJQl72Dy8hTLc7KGYDuSueM";

export const chainConfig = {
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
};

export const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {chainConfig},
});

export const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});
