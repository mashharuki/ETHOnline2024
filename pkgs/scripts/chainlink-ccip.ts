import {Contract, ethers, Wallet} from "ethers";
import SourceMinterABI from "./abis/SourceMinter.json";

const privateKey = process.env.PRIVATE_KEY;
const sepoliaRpcUrl = process.env.SEPOLIA_RPC_URL;
const sourceMinter = process.env.SOURCE_MINTER_ADDRESS;

/**
 * createContractInstance
 */
const createContractInstance = () => {
  const provider = new ethers.JsonRpcProvider(sepoliaRpcUrl);
  const wallet = new Wallet(privateKey!, provider);
  const contract = new Contract(sourceMinter!, SourceMinterABI, wallet);

  return contract;
};

/**
 * create CrossChain Mint NFT Transaction
 */
export const createCrossChainMintNFTTransaction = async () => {
  return {
    //SourceMinterABI,
    functionName: "mint",
    to: "0xettggsgsg",
    SourceChain: "sepolia",
    destinationChain: "baseSepolia",
    fee: "LINK",
  };
};

/**
 * send CrossChain Mint NFT Transaction
 */
export const sendCrossChainMintNFTTransaction = async () => {
  const contract = createContractInstance();
};
