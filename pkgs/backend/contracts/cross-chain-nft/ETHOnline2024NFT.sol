// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * ETHOnline2024NFT Contract
 */
contract ETHOnline2024NFT is ERC721URIStorage {
  uint256 internal tokenId;
  string tokenBaseUri;

  constructor(string memory name, string memory symbol, string memory baseUri) ERC721(name, symbol) {
    tokenBaseUri = baseUri;
  }

  function mint(address to) public {
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, tokenBaseUri);
    unchecked {
      tokenId++;
    }
  }
}
