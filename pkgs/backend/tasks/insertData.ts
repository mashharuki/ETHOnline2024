import "dotenv/config";
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {loadDeployedContractAddresses} from "../helper/contractsJsonHelper";

task("insertData", "insert data").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const {
      contracts: {TxDB},
    } = loadDeployedContractAddresses(hre.network.name);
    // create TxDB contract
    const txDB = await hre.ethers.getContractAt("TxDB", TxDB);

    try {
      // insert
      const tx = await txDB.insertTransaction(
        "0x123",
        "1",
        "0xabc",
        "0xdef",
        "data",
        "signature",
        "plaintext"
      );
      console.log("tx hash:", tx.hash);
    } catch (e) {
      console.error("err:", e);
    }
  }
);
