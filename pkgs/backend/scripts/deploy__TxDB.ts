import {ethers, network} from "hardhat";
import {writeContractAddress} from "../helper/contractsJsonHelper";

/**
 * deploy TxDB contract script
 */
async function main() {
  console.log(
    ` ============================================== [start] ================================================ `
  );

  // TxDB deploy
  const TxDB = await ethers.getContractFactory("TxDB");
  const txDB = await TxDB.deploy();
  console.log(` TxDB deployed to ${txDB.target}`);

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "TxDB",
    value: txDB.target as any,
    network: network.name,
  });

  console.log(
    ` =============================================== [end]  =============================================== `
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
