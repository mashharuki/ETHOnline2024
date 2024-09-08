// SPDX-License-Identifier: MIT

pragma solidity ^0.8.25;

import "./IMonsterNFT.sol";

interface IAnalizer {
  struct AnalysisResult {
    AnalysisData data;
    IMonsterNFT.Parameters monsterParameters;
  }

  struct AnalysisData {
    address targetContract;
    string functionName;
    string description;
    uint256 value;
    uint8 complexity;
    uint8 riskLevel;
  }

  event Analized(
    uint256 indexed callId,
    address targetContract,
    string functionName,
    string description,
    uint256 value,
    uint8 complexity,
    uint8 riskLevel
  );

  function analyze(string memory message) external returns (uint256);
}
