import {Contract, ethers, Wallet} from "ethers";
import ABI from "../abis/OpenAiSimpleLLM.json";

require("dotenv").config();

/**
 * Galadrielのコントラクトの機能を呼び出してAIに解析させるメソッド
 */
export const analyzeTxData = async (contract: any, message: string) => {
  // Call the sendMessage function of SIMPLE_LLM_CONTRACT_ADDRESS
  const transactionResponse = await contract.sendMessage(message);
  const receipt = await transactionResponse.wait();
  console.log(`Message sent, tx hash: ${receipt.hash}`);
  console.log(`Chat started with message: "${message}"`);

  let result = "";
  // Read the LLM response on-chain
  while (true) {
    const response = await contract.response();
    if (response) {
      console.log("Response from contract:", response);
      result = response;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  return result;
};

/**
 * トランザクションデータを組み立てるメソッド
 */
export const createTxData = async (wallet: Wallet) => {
  const to = "0x1431ea8af860C3862A919968C71f901aEdE1910E";
  const value = ethers.parseEther("0.01");
  // create a transaction
  const transaction = await wallet.signTransaction({
    to: to,
    value: value,
  });

  console.log("Transaction created:", transaction);

  // estimeate gas
  const gasEstimate = await wallet.estimateGas({
    to: to,
    value: value,
  });

  console.log("Gas estimate:", gasEstimate);

  return {
    to: to,
    value: value.toString(),
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
  const agentAddress = process.env.AGENT_CONTRACT_ADDRESS;
  if (!agentAddress) throw Error("Missing AGENT_CONTRACT_ADDRESS in .env");

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

    The data to be analyzed is only this transaction data. 
    It is separate from the transaction data analyzed previously.

    Here is a transaction data:
    ${JSON.stringify(tx)}

    [output]
  `;

  // Call the sendMessage function of SIMPLE_LLM_CONTRACT_ADDRESS
  const result = await analyzeTxData(contract, message);

  const message4 = `
    Based on the following analysis results, please describe the transaction processing flow using Mermaid syntax (Flow).

    like this:
    
    flowchart TD
      A[Christmas] -->|Get money| B(Go shopping)
      B --> C{Let me think}
      C -->|One| D[Laptop]
      C -->|Two| E[iPhone]
      C -->|Three| F[fa:fa-car Car]

    [analysis results]
    ${result}

    [output]
  `;

  // Call the sendMessage function of SIMPLE_LLM_CONTRACT_ADDRESS
  await analyzeTxData(contract, message4);

  // ##################################  ここからはAAのuserOpを解析させるロジック  ##################################
  /*
  // createAAWallet
  const {smartWallet, saAddress} = await createAAWallet();

  // base sepolia
  const NFT_ADDRESS = process.env.NFT_ADDRESS;

  const abi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  // encodeFunctionData
  const encodedData = encodeFunctionData({
    abi: abi,
    functionName: "mint",
    args: [saAddress],
  }) as `0x${string}`;

  // トランザクションデータを作成する。NFTをミントするトランザクションデータを想定
  const txData = {
    to: NFT_ADDRESS,
    data: encodedData,
  };

  // create userOp
  const userOp = await createMintNFTUserOp(smartWallet, txData);
  console.log("Built UserOp: ", userOp);

  // decode userOp
  const decodedUserOp = await decodeFunctionData({
    abi: abi,
    data: encodedData as `0x${string}`,
  });

  console.log("Decoded UserOp calldata: ", decodedUserOp);

  const userOpData = {
    blockchain: baseSepolia,
    to: NFT_ADDRESS,
    data: decodedUserOp,
    builtUserOP: userOp,
  };

  const message2 = `
    You are an expert in blockchain analysis.
    Please analyze the following blockchain transaction data and provide a detailed natural language description. 
    This Transaction is a User operation for minting an NFT.
    The description should include:

    - The type of transaction (e.g., transfer, contract execution, staking).
    - The sender and receiver addresses.
    - The amount of cryptocurrency or tokens involved, including the currency type.
    - Any associated fees or costs.
    - The date and time of the transaction.
    - Any relevant contract details, if applicable.
    - The purpose or intent behind the transaction, if identifiable.

    Here is a transaction data:
    ${JSON.stringify(userOpData)}

    [output]
  `;

  // Call the sendMessage function of SIMPLE_LLM_CONTRACT_ADDRESS
  await analyzeTxData(contract, message2);

  // send userOp
  //await sendUserOp(smartWallet, txData);

  // ##################################  ここからクロスチェーンTxを解析させるロジック  ##################################

  const cretedCrossChainTxData = await createCrossChainMintNFTTransaction();

  const message3 = `
    You are an expert in blockchain analysis.
    Please analyze the following blockchain transaction data and provide a detailed natural language description. 
    This Transaction is a CrossChain Transaction for minting an NFT.

    The description should include:

    - The type of transaction (e.g., transfer, contract execution, staking).
    - The sender and receiver addresses.
    - The amount of cryptocurrency or tokens involved, including the currency type.
    - Any associated fees or costs.
    - The date and time of the transaction.
    - Any relevant contract details, if applicable.
    - The purpose or intent behind the transaction, if identifiable.

    Here is a transaction data:
    ${JSON.stringify(cretedCrossChainTxData)}

    [output]
  `;

  // Call the sendMessage function of SIMPLE_LLM_CONTRACT_ADDRESS
  await analyzeTxData(contract, message3);
  */
}

main();
