import {Contract, ethers, Wallet} from "ethers";
import * as readline from "readline";
import ABI from "./abis/OpenAiSimpleLLM.json";

require("dotenv").config();

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

  const message = `
    The following data represents a transaction that will be sent to the blockchain. 
    Could you please explain this data in plain language so that even a beginner can understand it?
    Please summarize it in a clear and concise manner.

    {
      "from": "0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072",
      "to": "0x1431ea8af860C3862A919968C71f901aEdE1910E",
      "value": 0.01
    }
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

async function getUserInput(): Promise<string | undefined> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(query, (answer) => {
        resolve(answer);
      });
    });
  };

  try {
    const input = await question("Message ChatGPT: ");
    rl.close();
    return input;
  } catch (err) {
    console.error("Error getting user input:", err);
    rl.close();
  }
}

main().then(() => console.log("Done"));
