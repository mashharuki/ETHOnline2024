import {SignerWithAddress} from "@nomicfoundation/hardhat-ethers/signers";
import {
  Analizer,
  ChatOracle,
  MonsterNFT,
  OpenAiChatGpt,
} from "../typechain-types";
import {ethers} from "hardhat";
import {AbiCoder} from "ethers";
import exp from "constants";
import {expect} from "chai";

describe("Analizer", () => {
  let oracle: ChatOracle;
  let openAiChatGPT: OpenAiChatGpt;
  let analizer: Analizer;
  let monsterNFT: MonsterNFT;

  let address1: SignerWithAddress;

  before(async () => {
    [address1] = await ethers.getSigners();

    const ChatOracle = await ethers.getContractFactory("ChatOracle");
    oracle = await ChatOracle.deploy();
    await oracle.waitForDeployment();

    const ChatGpt = await ethers.getContractFactory("OpenAiChatGpt");
    openAiChatGPT = await ChatGpt.deploy(await oracle.getAddress());
    await openAiChatGPT.waitForDeployment();

    const MonsterNFT = await ethers.getContractFactory("MonsterNFT");
    monsterNFT = await MonsterNFT.deploy();
    await monsterNFT.waitForDeployment();

    const Analizer = await ethers.getContractFactory("Analizer");
    analizer = await Analizer.deploy(
      await oracle.getAddress(),
      await monsterNFT.getAddress()
    );
    await analizer.waitForDeployment();

    await oracle.updateWhitelist(address1.address, true);
    await oracle.addPcr0Hash(
      "5c8ce02f8c739a6578886ef009dc27dc69ac85a631689b093f75f6ae238e10d70a08dce8f0cafdd1f7d9b3a26c889565"
    );
  });

  it("Should request analyze", async () => {
    await analizer.analyze("hello world");

    const encodedContent = new AbiCoder().encode(
      [
        "tuple(address,string,string,uint256,uint8,uint8)",
        "tuple(string,string,uint256,uint64,uint64,uint64,uint64)",
      ],
      [
        [
          address1.address,
          "hello world",
          "hello world",
          BigInt(0),
          BigInt(0),
          BigInt(0),
        ],
        [
          "Water Dragon",
          "Water Dragon is a powerful creature that lives in the ocean. It has the ability to control water and create powerful waves.",
          BigInt(3000),
          BigInt(50),
          BigInt(140),
          BigInt(100),
          BigInt(230),
        ],
      ]
    );

    console.log(encodedContent);

    await oracle.connect(address1).addOpenAiResponse(
      0,
      0,
      {
        id: "test",
        content: encodedContent,
        functionName: "test",
        functionArguments: "test",
        created: 0,
        model: "test",
        systemFingerprint: "test",
        object: "test",
        completionTokens: 0,
        promptTokens: 0,
        totalTokens: 0,
      },
      ""
    );

    await oracle
      .connect(address1)
      .addFunctionResponse(0, 0, "https://google.com", "");
  });

  it("check nft metadata", async () => {
    const metadata = await monsterNFT.tokenURI(0);

    console.log(metadata);

    const decodedTokenURI = JSON.parse(
      Buffer.from(metadata.split(",")[1], "base64").toString("utf-8")
    );

    expect(decodedTokenURI).to.deep.equal({
      name: "Water Dragon",
      description:
        "Water Dragon is a powerful creature that lives in the ocean. It has the ability to control water and create powerful waves.",
      image: "https://google.com",
      attributes: [
        {
          trait_type: "Health",
          value: 3000,
        },
        {
          trait_type: "Attack",
          value: 50,
        },
        {
          trait_type: "Defense",
          value: 140,
        },
        {
          trait_type: "Speed",
          value: 100,
        },
        {
          trait_type: "Magic",
          value: 230,
        },
      ],
    });
  });
});
