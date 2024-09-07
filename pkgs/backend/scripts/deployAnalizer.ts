import {ethers} from "hardhat";

async function main() {
  if (!process.env.ORACLE_ADDRESS) {
    throw new Error("ORACLE_ADDRESS env variable is not set.");
  }
  const oracleAddress: string = process.env.ORACLE_ADDRESS;
  await deployAnalyzer(oracleAddress);
}

async function deployAnalyzer(oracleAddress: string) {
  const contract = await ethers.deployContract(
    "Analizer",
    [oracleAddress, "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e"],
    {}
  );

  await contract.waitForDeployment();

  console.log(`Test contract deployed to ${contract.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
