import {ethers, network} from "hardhat";
import {routerConfig} from "../helper/ccip/constants";
import {writeContractAddress} from "../helper/contractsJsonHelper";

/**
 * deploy deploy-destination & NFT contract script
 */
async function main() {
  console.log(
    ` ============================================== [start] ================================================ `
  );

  // NFTメタデータURI
  // const baseUri = "https://bafybeicfsjwjtdlt67nkfoxsma4cyl4zsjjyqtn27rgnpno5gr2zd5yf34.ipfs.w3s.link/sample";

  // MonsterNFT deploy
  const MonsterNFT = await ethers.getContractFactory("MonsterNFT");
  const monsterNFT = await MonsterNFT.deploy();
  console.log(` MonsterNFT deployed to ${monsterNFT.target}`);

  // get Router Address
  let routerAddress = "";

  // set Router Address
  if (network.name === "baseSepolia") {
    routerAddress = routerConfig.baseSepolia.address;
  }

  // DestinationMinter deploy
  const DestinationMinter = await ethers.getContractFactory(
    "DestinationMinter"
  );
  const destinationMinter = await DestinationMinter.deploy(
    routerAddress,
    monsterNFT.target
  );
  console.log(`DestinationMinter deployed to ${destinationMinter.target}`);

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "MonsterNFT",
    value: monsterNFT.target as any,
    network: network.name,
  });

  writeContractAddress({
    group: "contracts",
    name: "DestinationMinter",
    value: destinationMinter.target as any,
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
