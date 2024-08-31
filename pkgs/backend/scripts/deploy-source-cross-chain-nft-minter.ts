import {ethers, network} from "hardhat";
import {LINK_ADDRESSES} from "../helper/ccip/constants";
import {getRouterConfig} from "../helper/ccip/utils";
import {writeContractAddress} from "../helper/contractsJsonHelper";

/**
 * deploy SourceMinter contract script
 */
async function main() {
  console.log(
    ` ============================================== [start] ================================================ `
  );

  const routerAddress = getRouterConfig(network.name).address;
  const linkAddress = LINK_ADDRESSES[network.name];

  // SourceMinter deploy
  const SourceMinter = await ethers.getContractFactory("SourceMinter");
  const sourceMinter = await SourceMinter.deploy(routerAddress, linkAddress);
  console.log(` SourceMinter deployed to ${sourceMinter.target}`);

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "SourceMinter",
    value: sourceMinter.target as any,
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
