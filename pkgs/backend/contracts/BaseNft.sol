// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract BaseNft is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor()
        ERC721("BaseNft", "BNT")
        Ownable(msg.sender)
    {}

    function safeMint(address to) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}
