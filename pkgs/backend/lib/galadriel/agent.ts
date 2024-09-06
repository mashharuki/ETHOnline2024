import {Contract, ethers, Wallet} from "ethers";
import {TransactionReceipt} from "viem";
import ABI from "./abis/Agent.json";

import * as dotenv from "dotenv";

dotenv.config();

interface Message {
  role: string;
  content: string;
}

const {GALADRIEL_RPC_URL, PRIVATE_KEY, AGENT_CONTRACT_ADDRESS} = process.env;

/**
 * AIエージェントで推論を実行するためのスクリプト
 */
export const runAgent = async (
  contract: any,
  query: string,
  maxIterations: number
) => {
  // Call the startChat function(runAgent method)
  const transactionResponse = await contract.runAgent(
    query,
    Number(maxIterations)
  );
  const receipt = await transactionResponse.wait();
  console.log(`Task sent, tx hash: ${receipt.hash}`);
  console.log(`Agent started with task: "${query}"`);

  // Get the agent run ID from transaction receipt logs
  let agentRunID = getAgentRunId(receipt, contract);
  console.log(`Created agent run ID: ${agentRunID}`);
  if (!agentRunID && agentRunID !== 0) {
    return;
  }

  let allMessages: Message[] = [];
  // Run the chat loop: read messages and send messages
  let exitNextLoop = false;
  while (true) {
    const newMessages: Message[] = await getNewMessages(
      contract,
      agentRunID,
      allMessages.length
    );
    if (newMessages) {
      for (let message of newMessages) {
        let roleDisplay = message.role === "assistant" ? "THOUGHT" : "STEP";
        let color = message.role === "assistant" ? "\x1b[36m" : "\x1b[33m"; // Cyan for thought, yellow for step
        console.log(`${color}${roleDisplay}\x1b[0m: ${message.content}`);
        allMessages.push(message);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (exitNextLoop) {
      console.log(`agent run ID ${agentRunID} finished!`);
      return allMessages;
    }
    if (await contract.isRunFinished(agentRunID)) {
      exitNextLoop = true;
    }
  }
};

/**
 * AI エージェント機能を試すスクリプト
 * @returns
 */
export async function generateImageFunction(prompt: string) {
  // コントラクトインスタンスを作成する。
  const provider = new ethers.JsonRpcProvider(GALADRIEL_RPC_URL);
  const wallet = new Wallet(PRIVATE_KEY!, provider);
  const contract = new Contract(AGENT_CONTRACT_ADDRESS!, ABI, wallet);
  // プロンプトを作成する。
  const message = `
    Generate an image of a ${prompt}.
  `;

  // const query = await getUserInput("Agent's task: ");
  const query = message;

  // const maxIterations = await getUserInput("Max iterations: ");
  const maxIterations = 5;

  const allMessages = await runAgent(contract, query, maxIterations);

  // console.log("result:", allMessages![2].content);
  return allMessages![2].content;
}

/**
 * getAgentRunId method
 * @param receipt
 * @param contract
 * @returns
 */
export function getAgentRunId(receipt: TransactionReceipt, contract: Contract) {
  let agentRunID;
  for (const log of receipt.logs) {
    try {
      const parsedLog = contract.interface.parseLog(log);
      if (parsedLog && parsedLog.name === "AgentRunCreated") {
        // Second event argument
        agentRunID = ethers.toNumber(parsedLog.args[1]);
      }
    } catch (error) {
      // This log might not have been from your contract, or it might be an anonymous log
      console.log("Could not parse log:", log);
    }
  }
  return agentRunID;
}

/**
 * getNewMessages method
 * @param contract
 * @param agentRunID
 * @param currentMessagesCount
 * @returns
 */
export async function getNewMessages(
  contract: Contract,
  agentRunID: number,
  currentMessagesCount: number
): Promise<Message[]> {
  const messages = await contract.getMessageHistory(agentRunID);

  const newMessages: Message[] = [];
  messages.forEach((message: any, i: number) => {
    if (i >= currentMessagesCount) {
      newMessages.push({
        role: message.role,
        content: message.content[0].value,
      });
    }
  });
  return newMessages;
}
