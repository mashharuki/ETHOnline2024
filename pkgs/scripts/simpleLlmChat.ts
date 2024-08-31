import {Contract, ethers, Wallet} from "ethers";
import ABI from "./abis/OpenAiSimpleLLM.json";

require("dotenv").config();

/**
 * トランザクションデータを組み立てるメソッド
 */
const createTxData = async (wallet: Wallet) => {
  // create a transaction
  const transaction = await wallet.signTransaction({
    to: "0x1431ea8af860C3862A919968C71f901aEdE1910E",
    value: ethers.parseEther("0.01"),
  });

  console.log("Transaction created:", transaction);

  // estimeate gas
  const gasEstimate = await wallet.estimateGas({
    to: "0x1431ea8af860C3862A919968C71f901aEdE1910E",
    value: ethers.parseEther("0.01"),
  });

  console.log("Gas estimate:", gasEstimate);

  return {
    to: "0x1431ea8af860C3862A919968C71f901aEdE1910E",
    value: ethers.parseEther("0.01").toString(),
    gas: gasEstimate.toString(),
    signedTx: transaction.toString(),
  };
};

/**
 * OpenAIのチャットを呼び出してみるシンプルなスクリプト
 */
async function main() {
  // 環境変数を読み込む
  const rpcUrl = process.env.RPC_URL;
  if (!rpcUrl) throw Error("Missing RPC_URL in .env");
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) throw Error("Missing PRIVATE_KEY in .env");
  const contractAddress = process.env.SIMPLE_LLM_CONTRACT_ADDRESS;
  if (!contractAddress)
    throw Error("Missing SIMPLE_LLM_CONTRACT_ADDRESS in .env");

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new Wallet(privateKey, provider);
  const contract = new Contract(contractAddress, ABI, wallet);

  // The message you want to start the chat with
  // const message = await getUserInput()

  const tx = await createTxData(wallet);

  const message = `
    You are an expert in blockchain analysis.
    Please analyze the following blockchain transaction data and provide a detailed natural language description. The description should include:

    - The type of transaction (e.g., transfer, contract execution, staking).
    - The sender and receiver addresses.
    - The amount of cryptocurrency or tokens involved, including the currency type.
    - Any associated fees or costs.
    - The date and time of the transaction.
    - Any relevant contract details, if applicable.
    - The purpose or intent behind the transaction, if identifiable.

    Here is a transaction data:
    ${JSON.stringify(tx)}

    [output]
  `;

  // Call the sendMessage function of SIMPLE_LLM_CONTRACT_ADDRESS
  const transactionResponse = await contract.sendMessage(message);
  const receipt = await transactionResponse.wait();
  console.log(`Message sent, tx hash: ${receipt.hash}`);
  console.log(`Chat started with message: "${message}"`);

  // Read the LLM response on-chain
  while (true) {
    const response = await contract.response();
    if (response) {
      console.log("Response from contract:", response);
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

main();
