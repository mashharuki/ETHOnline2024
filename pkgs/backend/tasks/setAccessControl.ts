import "dotenv/config";
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {loadDeployedContractAddresses} from "../helper/contractsJsonHelper";

task("setAccessControl", "setAccessControl").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const {
      contracts: {TxDB},
    } = loadDeployedContractAddresses(hre.network.name);
    // create TxDB contract
    const txDB = await hre.ethers.getContractAt("TxDB", TxDB);

    try {
      const tx = await txDB.setAccessControl();
      console.log("tx hash:", tx.hash);
    } catch (e) {
      console.error("err:", e);
    }
  }
);
