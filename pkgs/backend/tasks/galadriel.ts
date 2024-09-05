import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {Analizer} from "../typechain-types";

task("galadriel-whitelist", "Whitelists an address in the Oracle contract")
  .addParam("oracleAddress", "The address of the Oracle contract")
  .addParam("whitelistAddress", "The address to whitelist")
  .setAction(async (taskArgs, hre) => {
    const oracleContractAddress = taskArgs.oracleAddress;
    const whitelistAddress = taskArgs.whitelistAddress;
    const pcr0Hash =
      "5c8ce02f8c739a6578886ef009dc27dc69ac85a631689b093f75f6ae238e10d70a08dce8f0cafdd1f7d9b3a26c889565";

    const contractABI = [
      "function updateWhitelist(address _addressToWhitelist, bool isWhitelisted)",
      "function addPcr0Hash(string memory pcr0Hash)",
    ];

    const [signer] = await hre.ethers.getSigners();
    const contract = new hre.ethers.Contract(
      oracleContractAddress,
      contractABI,
      signer
    );

    console.log(`Whitelisting address: "${whitelistAddress}"...`);
    const updateTx = await contract.updateWhitelist(whitelistAddress, true);
    await updateTx.wait();
    console.log(`Address whitelisted: "${whitelistAddress}"`);

    // Add PCR0 hash
    console.log(`Adding PCR0 hash for: "${whitelistAddress}"...`);
    const pcr0Tx = await contract.addPcr0Hash(pcr0Hash);
    await pcr0Tx.wait();
    console.log(`PCR0 hash added for: "${whitelistAddress}"`);
  });

task("galadriel-analyze", "Calls the OpenAI LLM")
  .addParam("contractAddress", "The address of the Test contract")
  .addParam("model", "The model to use")
  .addParam("message", "The message to send to the model")
  .setAction(async (taskArgs, hre) => {
    const contractAddress = taskArgs.contractAddress;
    const model = taskArgs.model;
    const message = taskArgs.message;

    const contract = await hre.ethers.getContractAt(
      "Analizer",
      contractAddress
    );
    const response = await queryOpenAiLLM(contract, model, message, hre);

    return checkResult(response);
  });

async function queryOpenAiLLM(
  contract: Analizer,
  model: string,
  message: string,
  hre: HardhatRuntimeEnvironment
): Promise<any> {
  try {
    const txResponse = await contract.callOpenAiLLM(model, message);
    await txResponse.wait();
    let response = await contract.lastResponse();
    let error = await contract.lastError();
    while (response.length === 0 && error.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      response = await contract.lastResponse();
      error = await contract.lastError();
    }
    return {response: response, error: error};
  } catch (error) {
    console.error(`Error calling contract function: ${error}`);
  }
  return {response: "", error: "Call failed"};
}

function checkResult(result: any): any {
  if (process.env.RUN_MODE != "e2e-script") {
    console.log(result);
    if (result.error.length > 0) {
      process.exit(1);
    }
  }
  return result;
}
