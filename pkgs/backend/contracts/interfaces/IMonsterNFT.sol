// SPDX-License-Identifier: MIT

pragma solidity 0.8.25;

interface IMonsterNFT {
  struct Parameters {
    string name;
    string description;
    uint256 health;
    uint64 attack;
    uint64 defense;
    uint64 speed;
    uint64 magic;
  }

  event Mint(address indexed to, uint256 indexed tokenId);

  event SetParameters(
    uint256 indexed tokenId,
    string name,
    string description,
    uint256 health,
    uint64 attack,
    uint64 defense,
    uint64 speed,
    uint64 magic
  );

  function safeMint(address to) external returns (uint256);

  function setParameters(
    uint256 tokenId,
    Parameters memory params
  ) external returns (uint256);

  function setImage(uint256 tokenId, string memory image) external;
}
