// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import { StringUtils } from "./lib/StringUtils.sol";
import {Base64} from "./lib/Base64.sol";

/**
 * @title MonsterNFT
 */
contract MonsterNFT is ERC721URIStorage, Ownable {
  uint256 private _nextTokenId;

  event Minted(address to, uint256 tokenId, string tokenUri);

  constructor()
    ERC721("MonsterNFT", "MNFT")
    Ownable(msg.sender)
  {}

  function safeMint(address to, string memory imgUrl) public {
    uint256 tokenId = _nextTokenId++;

    // SVGのデータをBase64の形式でエンコードする。
    string memory json = Base64.encode(
      abi.encodePacked(
        '{"name": "MonsterNFT', 
        '", "description": "This is a Monster NFT", "image": "',
        imgUrl,
        '"}'
      )
    );
    // トークンURI用のデータを生成する。
    string memory finalTokenUri = string( abi.encodePacked("data:application/json;base64,", json));

    _safeMint(to, tokenId);
    // トークンURI情報を登録する。
    _setTokenURI(tokenId, finalTokenUri);

    emit Minted(to, tokenId, finalTokenUri);
  }
}
