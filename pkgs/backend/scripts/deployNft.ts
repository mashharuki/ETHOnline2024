import {ethers, network} from "hardhat";
import {writeContractAddress} from "../helper/contractsJsonHelper";

/**
 * deploy MockVerifier contract script
 */
async function main() {
  console.log(
    ` ============================================== [start] ================================================ `
  );

  // BaseNft deploy
  const BaseNft = await ethers.getContractFactory("BaseNft");
  const baseNft = await BaseNft.deploy();
  console.log(` BaseNft deployed to ${baseNft.target}`);


  writeContractAddress({
    group: "contracts",
    name: "BaseNft",
    value: baseNft.target as any,
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
