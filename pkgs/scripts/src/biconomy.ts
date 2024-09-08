import {
  BiconomySmartAccountV2,
  createSmartAccountClient,
  PaymasterMode,
} from "@biconomy/account";
import {createWalletClient, http} from "viem";
import {privateKeyToAccount} from "viem/accounts";
import {baseSepolia} from "viem/chains";

require("dotenv").config();

const {PRIVATE_KEY, BICONOMY_API_KEY, BICONOMY_BUNLDER_API_KEY} = process.env;

/**
 * Create AA Wallet using Biconomy Smart Account
 */
export const createAAWallet = async () => {
  // Your configuration with private key and Biconomy API key
  const config = {
    privateKey: PRIVATE_KEY,
    biconomyPaymasterApiKey: BICONOMY_API_KEY,
    bundlerUrl: `https://bundler.biconomy.io/api/v2/${baseSepolia.id}/${BICONOMY_BUNLDER_API_KEY}`,
  };

  // Generate EOA from private key using ethers.js
  const account = privateKeyToAccount(config.privateKey as `0x${string}`);
  const client = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(),
  });

  // Create Biconomy Smart Account instance
  const smartWallet = await createSmartAccountClient({
    signer: client,
    biconomyPaymasterApiKey: config.biconomyPaymasterApiKey,
    bundlerUrl: config.bundlerUrl,
  });

  const saAddress = await smartWallet.getAccountAddress();
  console.log("SA Address", saAddress);

  return {smartWallet, saAddress};
};

/**
 * Create Mint NFT transaction userOp
 */
export const createMintNFTUserOp = async (
  smartWallet: BiconomySmartAccountV2,
  tx: any
) => {
  // build userOp
  const builtUserOp = await smartWallet.buildUserOp([tx], {
    paymasterServiceData: {mode: PaymasterMode.SPONSORED},
  });

  console.log("UserOp", builtUserOp);

  return builtUserOp;
};

/**
 * send userOp
 */
export const sendUserOp = async (
  smartWallet: BiconomySmartAccountV2,
  tx: any
) => {
  // Send the transaction and get the transaction hash
  const userOpResponse = await smartWallet.sendTransaction(tx, {
    paymasterServiceData: {mode: PaymasterMode.SPONSORED},
  });
  const {transactionHash} = await userOpResponse.waitForTxHash();
  console.log("Transaction Hash", transactionHash);
  const userOpReceipt = await userOpResponse.wait();
  if (userOpReceipt.success == "true") {
    console.log("UserOp receipt", userOpReceipt);
    console.log("Transaction receipt", userOpReceipt.receipt);
  }
};

createAAWallet();
