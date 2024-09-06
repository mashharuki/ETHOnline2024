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

  console.log(
    ` ============================================== [mint start] ================================================ `
  );

  const tx1 = await baseNft.safeMint(
    "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
    {gasLimit: 20000000}
  );
  await tx1.wait();
  const tx2 = await baseNft.safeMint(
    "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
    {gasLimit: 20000000}
  );
  await tx2.wait();
  const tx3 = await baseNft.safeMint(
    "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
    {gasLimit: 20000000}
  );
  await tx3.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
