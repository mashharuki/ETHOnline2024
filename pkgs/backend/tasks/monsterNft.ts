import "dotenv/config";
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {Spinner} from "../helper/ccip/spinner";
import {loadDeployedContractAddresses} from "../helper/contractsJsonHelper";

task("mintMonsterNft", "mintMonsterNft")
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
      /*
      // generate new image
      const generatedImage = await generateImageFunction(taskArgs.prompt);

      console.log("generatedImage:", generatedImage);
      */

      // mint Cross Chain NFT
      const tx = await monsterNFT.safeMint(taskArgs.to);

      await tx.wait();

      spinner.stop();
      console.log(`✅ Mint request sent, transaction hash: ${tx.hash}`);
    } catch (e) {
      console.error("err:", e);
    }
  });

task("setParameters", "setParameters")
  .addParam("tokenid", "TokenId")
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

      // create parameters
      const params = {
        name: "Cross Chain Monster NFT",
        description: "This is a Cross Chain Monster NFT",
        health: 100,
        attack: 100,
        defense: 100,
        speed: 100,
        magic: 100,
      };

      // setParameters Cross Chain NFT
      const tx = await monsterNFT.setParameters(taskArgs.tokenid, params);

      await tx.wait();

      spinner.stop();
      console.log(
        `✅ setParameters request sent, transaction hash: ${tx.hash}`
      );
    } catch (e) {
      console.error("err:", e);
    }
  });

task("setImage", "setImage")
  .addParam("tokenid", "TokenId")
  .addParam("image", "image URL")
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

      // setImage Cross Chain NFT
      const tx = await monsterNFT.setImage(taskArgs.tokenid, taskArgs.image);

      await tx.wait();

      spinner.stop();
      console.log(`✅ setImage request sent, transaction hash: ${tx.hash}`);
    } catch (e) {
      console.error("err:", e);
    }
  });
