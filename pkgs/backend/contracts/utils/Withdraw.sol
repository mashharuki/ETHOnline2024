// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/IERC20.sol";

/**
 * Withdraw Contract
 */
contract Withdraw is OwnerIsCreator {
  error FailedToWithdrawEth(address owner, address target, uint256 value);

  /**
   * ネイティブトークンを引き出すためのメソッド　
   */
  function withdraw(address beneficiary) public onlyOwner {
    uint256 amount = address(this).balance;
    (bool sent, ) = beneficiary.call{value: amount}("");
    if (!sent) revert FailedToWithdrawEth(msg.sender, beneficiary, amount);
  }

  /**
   * ERC20トークンを引き出すためのメソッド
   */
  function withdrawToken(
    address beneficiary,
    address token
  ) public onlyOwner {
    uint256 amount = IERC20(token).balanceOf(address(this));
    IERC20(token).transfer(beneficiary, amount);
  }
}