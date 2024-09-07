import "dotenv/config";
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {Spinner} from "../helper/ccip/spinner";
import {getPayFeesIn, getRouterConfig} from "../helper/ccip/utils";
import {loadDeployedContractAddresses} from "../helper/contractsJsonHelper";

task("crossChainMint", "crossChainMint")
  .addParam("destination", "destinationChain")
  .addParam("to", "to address")
  .addParam("fee", "payFeesIn LINK or Native")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address (from Chain)
    const {
      contracts: {SourceMinter},
    } = loadDeployedContractAddresses(hre.network.name);

    // create SourceMinter contract
    const sourceMinter = await hre.ethers.getContractAt(
      "SourceMinter",
      SourceMinter
    );

    // get Contract Address (Destination Chain)
    const {
      contracts: {DestinationMinter},
    } = loadDeployedContractAddresses(taskArgs.destination);

    const destinationChainSelector = getRouterConfig(
      taskArgs.destination
    ).chainSelector;
    const fees = getPayFeesIn(taskArgs.fee);

    console.log(`destinationChainSelector: ${destinationChainSelector}`);
    console.log(`DestinationMinter: ${DestinationMinter}`);
    console.log(`payFeesIn: ${fees}`);

    try {
      const spinner: Spinner = new Spinner();
      spinner.start();

      // mint Cross Chain NFT
      const tx = await sourceMinter.mint(
        destinationChainSelector,
        DestinationMinter,
        taskArgs.to,
        fees
      );

      await tx.wait();

      spinner.stop();
      console.log(`✅ Mint request sent, transaction hash: ${tx.hash}`);
    } catch (e) {
      console.error("err:", e);
    }
  });

task("crossChainSetParameters", "crossChainSetParameters")
  .addParam("destination", "destinationChain")
  .addParam("tokenid", "Token ID")
  .addParam("fee", "payFeesIn LINK or Native")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address (from Chain)
    const {
      contracts: {SourceMinter},
    } = loadDeployedContractAddresses(hre.network.name);

    // create SourceMinter contract
    const sourceMinter = await hre.ethers.getContractAt(
      "SourceMinter",
      SourceMinter
    );

    // get Contract Address (Destination Chain)
    const {
      contracts: {DestinationMinter},
    } = loadDeployedContractAddresses(taskArgs.destination);

    const destinationChainSelector = getRouterConfig(
      taskArgs.destination
    ).chainSelector;
    const fees = getPayFeesIn(taskArgs.fee);

    console.log(`destinationChainSelector: ${destinationChainSelector}`);
    console.log(`DestinationMinter: ${DestinationMinter}`);
    console.log(`payFeesIn: ${fees}`);

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
      const tx = await sourceMinter.setParameters(
        destinationChainSelector,
        DestinationMinter,
        taskArgs.tokenid,
        params,
        fees
      );

      await tx.wait();

      spinner.stop();
      console.log(
        `✅ setParameters request sent, transaction hash: ${tx.hash}`
      );
    } catch (e) {
      console.error("err:", e);
    }
  });

task("crossChainSetImage", "crossChainSetImage")
  .addParam("destination", "destinationChain")
  .addParam("tokenid", "Token ID")
  .addParam("image", "Image URL")
  .addParam("fee", "payFeesIn LINK or Native")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address (from Chain)
    const {
      contracts: {SourceMinter},
    } = loadDeployedContractAddresses(hre.network.name);

    // create SourceMinter contract
    const sourceMinter = await hre.ethers.getContractAt(
      "SourceMinter",
      SourceMinter
    );

    // get Contract Address (Destination Chain)
    const {
      contracts: {DestinationMinter},
    } = loadDeployedContractAddresses(taskArgs.destination);

    const destinationChainSelector = getRouterConfig(
      taskArgs.destination
    ).chainSelector;
    const fees = getPayFeesIn(taskArgs.fee);

    console.log(`destinationChainSelector: ${destinationChainSelector}`);
    console.log(`DestinationMinter: ${DestinationMinter}`);
    console.log(`payFeesIn: ${fees}`);

    try {
      const spinner: Spinner = new Spinner();
      spinner.start();

      // setParameters Cross Chain NFT
      const tx = await sourceMinter.setImage(
        destinationChainSelector,
        DestinationMinter,
        taskArgs.tokenid,
        taskArgs.image,
        fees
      );

      await tx.wait();

      spinner.stop();
      console.log(`✅ setImage request sent, transaction hash: ${tx.hash}`);
    } catch (e) {
      console.error("err:", e);
    }
  });
