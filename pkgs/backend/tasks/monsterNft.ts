import "dotenv/config";
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {Spinner} from "../helper/ccip/spinner";
import {loadDeployedContractAddresses} from "../helper/contractsJsonHelper";
import {decodeBase64Json} from "../helper/json";

task("mintMonsterNft", "mintMonsterNft")
  .addParam("to", "to address")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const {
      contracts: {MonsterNFT},
    } = loadDeployedContractAddresses(hre.network.name);

    // create MonsterNFT contract
    const monsterNFT = await hre.ethers.getContractAt("MonsterNFT", MonsterNFT);

    try {
      const spinner: Spinner = new Spinner();
      spinner.start();
      /*
      // generate new image
      const generatedImage = await generateImageFunction(taskArgs.prompt);

      console.log("generatedImage:", generatedImage);
      */

      // mint Cross Chain NFT
      const tx = await monsterNFT.safeMint(taskArgs.to);

      await tx.wait();

      spinner.stop();
      console.log(`✅ Mint request sent, transaction hash: ${tx.hash}`);
    } catch (e) {
      console.error("err:", e);
    }
  });

task("setParameters", "setParameters")
  .addParam("tokenid", "TokenId")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const {
      contracts: {MonsterNFT},
    } = loadDeployedContractAddresses(hre.network.name);

    // create MonsterNFT contract
    const monsterNFT = await hre.ethers.getContractAt("MonsterNFT", MonsterNFT);

    try {
      const spinner: Spinner = new Spinner();
      spinner.start();

      // create parameters
      const params = {
        name: "Cross Chain Monster NFT",
        description: "This is a Cross Chain Monster NFT",
        health: 100,
        attack: 100,
        defense: 100,
        speed: 100,
        magic: 100,
      };

      // setParameters Cross Chain NFT
      const tx = await monsterNFT.setParameters(taskArgs.tokenid, params);

      await tx.wait();

      spinner.stop();
      console.log(
        `✅ setParameters request sent, transaction hash: ${tx.hash}`
      );
    } catch (e) {
      console.error("err:", e);
    }
  });

task("setImage", "setImage")
  .addParam("tokenid", "TokenId")
  .addParam("image", "image URL")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const {
      contracts: {MonsterNFT},
    } = loadDeployedContractAddresses(hre.network.name);

    // create MonsterNFT contract
    const monsterNFT = await hre.ethers.getContractAt("MonsterNFT", MonsterNFT);

    try {
      const spinner: Spinner = new Spinner();
      spinner.start();

      // setImage Cross Chain NFT
      const tx = await monsterNFT.setImage(taskArgs.tokenid, taskArgs.image);

      await tx.wait();

      spinner.stop();
      console.log(`✅ setImage request sent, transaction hash: ${tx.hash}`);
    } catch (e) {
      console.error("err:", e);
    }
  });

task("getTokenURI", "getTokenURI of MonsterNFT")
  .addParam("tokenid", "TokenId")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // get Contract Address
    const {
      contracts: {MonsterNFT},
    } = loadDeployedContractAddresses(hre.network.name);

    // create MonsterNFT contract
    const monsterNFT = await hre.ethers.getContractAt("MonsterNFT", MonsterNFT);

    try {
      const spinner: Spinner = new Spinner();
      spinner.start();

      // getTokenURI Monster NFT
      const tokenURI = await monsterNFT.tokenURI(taskArgs.tokenid);

      spinner.stop();
      console.log(`✅  tokenURI: ${tokenURI}`);
      const decodedJson: any = decodeBase64Json(tokenURI);

      /**
       * 特定のtrait_typeを持つAttributeを取得する関数
       * @param traitType
       * @returns
       */
      function getAttributeValue(
        attributes: any,
        traitType: string
      ): number | undefined {
        // trait_typeが一致するAttributeを検索
        const attribute = attributes.find(
          (attr: any) => attr.trait_type === traitType
        );

        // 見つかった場合はそのvalueを返す。見つからない場合はundefinedを返す。
        return attribute?.value;
      }

      //console.log("decodedJson:", decodedJson);
      console.log("name:", decodedJson.name);
      console.log("description:", decodedJson.description);
      console.log("image:", decodedJson.image);
      console.log(
        "Health:",
        getAttributeValue(decodedJson.attributes, "Health")
      );
      console.log(
        "Attack:",
        getAttributeValue(decodedJson.attributes, "Attack")
      );
      console.log(
        "Defense:",
        getAttributeValue(decodedJson.attributes, "Defense")
      );
      console.log("Speed:", getAttributeValue(decodedJson.attributes, "Speed"));
      console.log("Magic:", getAttributeValue(decodedJson.attributes, "Magic"));
    } catch (e) {
      console.error("err:", e);
    }
  });
