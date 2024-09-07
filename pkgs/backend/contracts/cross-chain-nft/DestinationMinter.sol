// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {MonsterNFT} from "./../MonsterNFT.sol";

/**
 * DestinationMinter Contract
 */
contract DestinationMinter is CCIPReceiver {
  MonsterNFT nft;

  event MintCallSuccessfull();

  /**
   * constructor
   */
  constructor(
    address router, 
    address nftAddress
  ) CCIPReceiver(router) {
    nft = MonsterNFT(nftAddress);
  }

  /**
   * call mint method
   */
  function _ccipReceive(
    Client.Any2EVMMessage memory message
  ) internal override {
    // execute mint method
    (bool success, ) = address(nft).call(message.data);
    require(success);
    emit MintCallSuccessfull();
  }
}