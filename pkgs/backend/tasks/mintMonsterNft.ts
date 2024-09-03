import "dotenv/config";
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {Spinner} from "../helper/ccip/spinner";
import {loadDeployedContractAddresses} from "../helper/contractsJsonHelper";
import {generateImageFunction} from "../lib/galadriel/agent";

task("mintMonsterNft", "mintMonsterNft")
  .addParam("prompt", "prompt for the AI agent")
  .addParam("to", "to address")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const {
      contracts: {MonsterNFT},
    } = loadDeployedContractAddresses(hre.network.name);

    // create MonsterNFT contract
    const monsterNFT = await hre.ethers.getContractAt("MonsterNFT", MonsterNFT);

    try {
      const spinner: Spinner = new Spinner();
      spinner.start();

      // generate new image
      const generatedImage = await generateImageFunction(taskArgs.prompt);

      console.log("generatedImage:", generatedImage);

      // mint Cross Chain NFT
      const tx = await monsterNFT.safeMint(taskArgs.to, generatedImage);

      await tx.wait();

      spinner.stop();
      console.log(`✅ Mint request sent, transaction hash: ${tx.hash}`);
    } catch (e) {
      console.error("err:", e);
    }
  });
