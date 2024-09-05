import {SignerWithAddress} from "@nomicfoundation/hardhat-ethers/signers";
import {MonsterNFT} from "../typechain-types";
import {ethers} from "hardhat";
import {expect} from "chai";

describe("MonsterNFT", () => {
  let monsterNFT: MonsterNFT;

  let address1: SignerWithAddress;
  let address2: SignerWithAddress;

  before(async () => {
    [address1, address2] = await ethers.getSigners();

    const MonsterNFT = await ethers.getContractFactory("MonsterNFT");
    monsterNFT = await MonsterNFT.deploy();
    await monsterNFT.waitForDeployment();
  });

  it("should mint NFT", async () => {
    await monsterNFT.safeMint(address1.address);
    await monsterNFT.safeMint(address2.address);

    expect(await monsterNFT.ownerOf(0)).to.equal(address1.address);
    expect(await monsterNFT.ownerOf(1)).to.equal(address2.address);
  });

  it("should set parameters", async () => {
    const parameters_1: MonsterNFT.ParametersStruct = {
      name: "monster1",
      description: "description1",
      health: 100,
      attack: 10,
      defense: 5,
      speed: 5,
      magic: 0,
    };

    let tx = await monsterNFT.setParameters(0, parameters_1);
    await tx.wait();

    const params = await monsterNFT.monsterParameters(0);
    expect(params.name).to.equal("monster1");
    expect(params.description).to.equal("description1");
    expect(params.health).to.equal(100);
    expect(params.attack).to.equal(10);
    expect(params.defense).to.equal(5);
    expect(params.speed).to.equal(5);
    expect(params.magic).to.equal(0);
  });

  it("should set image", async () => {
    let tx = await monsterNFT.setImage(0, "image1");
    await tx.wait();
  });

  it("should return tokenURI as base64", async () => {
    const tokenURI = await monsterNFT.tokenURI(0);
    console.log(
      Buffer.from(tokenURI.split(",")[1], "base64").toString("utf-8")
    );
    const decodedTokenURI = JSON.parse(
      Buffer.from(tokenURI.split(",")[1], "base64").toString("utf-8")
    );

    expect(decodedTokenURI).to.deep.equal({
      name: "monster1",
      description: "description1",
      image: "image1",
      attributes: [
        {trait_type: "Health", value: 100},
        {trait_type: "Attack", value: 10},
        {trait_type: "Defense", value: 5},
        {trait_type: "Speed", value: 5},
        {trait_type: "Magic", value: 0},
      ],
    });
  });
});
