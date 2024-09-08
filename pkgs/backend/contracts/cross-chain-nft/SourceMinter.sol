// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {Withdraw} from "./../utils/Withdraw.sol";

/**
 * SourceMinter Contract
 */
contract SourceMinter is Withdraw {

  enum PayFeesIn {
    Native,
    LINK
  }

  struct Parameters {
    string name;
    string description;
    uint256 health;
    uint64 attack;
    uint64 defense;
    uint64 speed;
    uint64 magic;
  }

  address immutable i_router;
  address immutable i_link;

  event MessageSent(bytes32 messageId);

  /**
   * constructor
   */
  constructor(
    address router, 
    address link
  ) {
    i_router = router;
    i_link = link;
    LinkTokenInterface(i_link).approve(i_router, type(uint256).max);
  }

  receive() external payable {}

  /**
   * call receiver's nft mint method
   */
  function mint(
    uint64 destinationChainSelector,
    address receiver,
    address to,
    PayFeesIn payFeesIn
  ) external {
    // create send data
    Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
      receiver: abi.encode(receiver),
      data: abi.encodeWithSignature("safeMint(address)", to),
      tokenAmounts: new Client.EVMTokenAmount[](0),
      extraArgs: "",
      feeToken: payFeesIn == PayFeesIn.LINK ? i_link : address(0)
    });

    // calc fee
    uint256 fee = IRouterClient(i_router).getFee(
      destinationChainSelector,
      message
    );

    bytes32 messageId;

    // send CCIP message
    if (payFeesIn == PayFeesIn.LINK) {
      // LinkTokenInterface(i_link).approve(i_router, fee);
      messageId = IRouterClient(i_router).ccipSend(
        destinationChainSelector,
        message
      );
    } else {
      messageId = IRouterClient(i_router).ccipSend{value: fee}(
        destinationChainSelector,
        message
      );
    }

    // emit event
    emit MessageSent(messageId);
  }

  /**
   * call receiver's setParameters method
   */
  function setParameters(
    uint64 destinationChainSelector,
    address receiver,
    uint256 tokenId, 
    Parameters memory params,
    PayFeesIn payFeesIn
  ) external {
    // create send data
    Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
      receiver: abi.encode(receiver),
      data: abi.encodeWithSignature("setParameters(uint256, Parameters)", tokenId, params),
      tokenAmounts: new Client.EVMTokenAmount[](0),
      extraArgs: "",
      feeToken: payFeesIn == PayFeesIn.LINK ? i_link : address(0)
    });

    // calc fee
    uint256 fee = IRouterClient(i_router).getFee(
      destinationChainSelector,
      message
    );

    bytes32 messageId;

    // send CCIP message
    if (payFeesIn == PayFeesIn.LINK) {
      // LinkTokenInterface(i_link).approve(i_router, fee);
      messageId = IRouterClient(i_router).ccipSend(
        destinationChainSelector,
        message
      );
    } else {
      messageId = IRouterClient(i_router).ccipSend{value: fee}(
        destinationChainSelector,
        message
      );
    }

    // emit event
    emit MessageSent(messageId);
  }

  /**
   * call receiver's setImage method
   */
  function setImage(
    uint64 destinationChainSelector,
    address receiver,
    uint256 tokenId, 
    string memory image,
    PayFeesIn payFeesIn
  ) external {
    // create send data
    Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
      receiver: abi.encode(receiver),
      data: abi.encodeWithSignature("setImage(uint256, string)", tokenId, image),
      tokenAmounts: new Client.EVMTokenAmount[](0),
      extraArgs: "",
      feeToken: payFeesIn == PayFeesIn.LINK ? i_link : address(0)
    });

    // calc fee
    uint256 fee = IRouterClient(i_router).getFee(
      destinationChainSelector,
      message
    );

    bytes32 messageId;

    // send CCIP message
    if (payFeesIn == PayFeesIn.LINK) {
      // LinkTokenInterface(i_link).approve(i_router, fee);
      messageId = IRouterClient(i_router).ccipSend(
        destinationChainSelector,
        message
      );
    } else {
      messageId = IRouterClient(i_router).ccipSend{value: fee}(
        destinationChainSelector,
        message
      );
    }

    // emit event
    emit MessageSent(messageId);
  }

}