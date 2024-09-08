import {ethers, network} from "hardhat";
import {writeContractAddress} from "../helper/contractsJsonHelper";

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
    [oracleAddress, "0xdC00bE7034C949053713117bc6FA3F4897C9c033"],
    {}
  );

  await contract.waitForDeployment();

  console.log(`Test contract deployed to ${contract.target}`);

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "Analizer",
    value: contract.target as any,
    network: network.name,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
