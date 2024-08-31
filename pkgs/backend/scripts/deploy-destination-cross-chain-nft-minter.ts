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
  const baseUri =
    "https://bafybeicfsjwjtdlt67nkfoxsma4cyl4zsjjyqtn27rgnpno5gr2zd5yf34.ipfs.w3s.link/sample";

  // NFT deploy
  const ETHOnline2024NFT = await ethers.getContractFactory("ETHOnline2024NFT");
  const nft = await ETHOnline2024NFT.deploy(
    "ETHOnline2024NFT",
    "ETHO24",
    baseUri
  );
  console.log(`ETHOnline2024NFT deployed to ${nft.target}`);

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
    nft.target
  );
  console.log(`DestinationMinter deployed to ${destinationMinter.target}`);

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "ETHOnline2024NFT",
    value: nft.target as any,
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
