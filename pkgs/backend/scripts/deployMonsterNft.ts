import {ethers, network} from "hardhat";
import {writeContractAddress} from "../helper/contractsJsonHelper";

/**
 * deploy MonsterNFT contract script
 */
async function main() {
  console.log(
    ` ============================================== [start] ================================================ `
  );

  // MonsterNFT deploy
  const MonsterNFT = await ethers.getContractFactory("MonsterNFT");
  const monsterNFT = await MonsterNFT.deploy();
  console.log(` MonsterNFT deployed to ${monsterNFT.target}`);

  writeContractAddress({
    group: "contracts",
    name: "MonsterNFT",
    value: monsterNFT.target as any,
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
