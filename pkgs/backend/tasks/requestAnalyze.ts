import "dotenv/config";
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";

task("analyze", "mintMonsterNft")
  .addParam("message", "to address")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // create MonsterNFT contract
    const analyzer = await hre.ethers.getContractAt(
      "Analizer",
      "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0"
    );

    try {
      const tx = await analyzer.analyze(taskArgs.message);
      await tx.wait();

      console.log(`✅ Mint request sent, transaction hash: ${tx.hash}`);
    } catch (e) {
      console.error("err:", e);
    }
  });
