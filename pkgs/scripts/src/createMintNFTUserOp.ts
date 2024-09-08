import {encodeFunctionData} from "viem";
import MonsterNFTABI from "../abis/MonsterNFT.json";
import {createAAWallet, createMintNFTUserOp} from "./biconomy";

/**
 * Sample script to create a mint NFT user operation
 */
const main = async () => {
  // create AA Wallet
  const {smartWallet, saAddress} = await createAAWallet();

  // creat encode data
  const encodeData = encodeFunctionData({
    abi: MonsterNFTABI,
    functionName: "safeMint",
    args: ["0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC"],
  });

  // tx data
  const tx = {
    to: saAddress,
    data: encodeData,
  };
  // create mint NFT user operation
  const userOp = await createMintNFTUserOp(smartWallet, tx);
};

main();
