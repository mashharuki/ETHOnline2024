import "dotenv/config";
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";

task("analyze", "mintMonsterNft")
  .addParam("message", "to address")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // create MonsterNFT contract
    const analyzer = await hre.ethers.getContractAt(
      "Analizer",
      "0xbE914D66aF1D6B7C46e1dfB641E4adCb6205cFc2"
    );

    try {
      const tx = await analyzer.analyze(taskArgs.message);
      await tx.wait();

      console.log(`✅ Mint request sent, transaction hash: ${tx.hash}`);
    } catch (e) {
      console.error("err:", e);
    }
  });
