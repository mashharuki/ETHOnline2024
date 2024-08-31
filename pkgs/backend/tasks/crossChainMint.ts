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
      contracts: {ETHOnline2024NFT, DestinationMinter},
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
