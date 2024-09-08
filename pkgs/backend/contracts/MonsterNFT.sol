// SPDX-License-Identifier: MIT
pragma solidity >=0.8.20;

import {IMonsterNFT} from "./interfaces/IMonsterNFT.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {StringUtils} from "./lib/StringUtils.sol";
import {Base64} from "./lib/Base64.sol";

/**
 * @title MonsterNFT
 */
contract MonsterNFT is IMonsterNFT, ERC721, Ownable {
  using Strings for uint256;
  using Strings for uint64;

  uint256 private _nextTokenId;

  mapping(uint256 => Parameters) public monsterParameters;

  mapping(uint256 => string) public monsterImages;

  constructor() ERC721("MonsterNFT", "MNFT") Ownable(msg.sender) {}

  function safeMint(address to) public returns (uint256) {
    uint256 tokenId = _nextTokenId++;

    _safeMint(to, tokenId);

    emit Mint(to, tokenId);

    return tokenId;
  }

  function setParameters(
    uint256 tokenId,
    Parameters memory params
  ) public returns (uint256) {
    require(tokenId <= _nextTokenId, "Token ID does not exist");
    require(monsterParameters[tokenId].health == 0, "Already set");

    monsterParameters[tokenId] = params;

    emit SetParameters(
      tokenId,
      params.name,
      params.description,
      params.health,
      params.attack,
      params.defense,
      params.speed,
      params.magic
    );

    return tokenId;
  }

  function setImage(uint256 tokenId, string memory image) public {
    require(tokenId <= _nextTokenId, "Token ID does not exist");

    require(bytes(monsterImages[tokenId]).length == 0, "Already set");

    monsterImages[tokenId] = image;
  }

  function tokenURI(
    uint256 tokenId
  ) public view override returns (string memory) {
    Parameters memory params = monsterParameters[tokenId];
    string memory image = monsterImages[tokenId];

    string memory json = Base64.encode(
      abi.encodePacked(
        "{",
        '"name":"',
        params.name,
        '",',
        '"description":"',
        params.description,
        '",',
        '"image":"',
        image,
        '",',
        '"attributes":[',
        '{"trait_type":"Health","value":',
        Strings.toString(params.health),
        "},",
        '{"trait_type":"Attack","value":',
        Strings.toString(params.attack),
        "},",
        '{"trait_type":"Defense","value":',
        Strings.toString(params.defense),
        "},",
        '{"trait_type":"Speed","value":',
        Strings.toString(params.speed),
        "},",
        '{"trait_type":"Magic","value":',
        Strings.toString(params.magic),
        "}",
        "]",
        "}"
      )
    );

    string memory finalTokenUri = string(
      abi.encodePacked("data:application/json;base64,", json)
    );

    return finalTokenUri;
  }
}
