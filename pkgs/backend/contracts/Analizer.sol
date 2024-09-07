// SPDX-License-Identifier: MIT

pragma solidity ^0.8.25;

import {IAnalizer} from "./interfaces/IAnalizer.sol";
import {IGaladrielOracle} from "./interfaces/IGaladrielOracle.sol";
import {IMonsterNFT} from "./interfaces/IMonsterNFT.sol";
import "hardhat/console.sol";

contract Analizer is IAnalizer {
  address public oracleAddress;

  IMonsterNFT public monsterNFT;

  IGaladrielOracle.Message llmMessage;

  uint256 private callsCount;

  mapping(uint256 => address) public callers;

  mapping(uint256 => uint256) public callIdToTokenId;

  constructor(address _oracleAddress, address _monsterNFTAddress) {
    oracleAddress = _oracleAddress;
    monsterNFT = IMonsterNFT(_monsterNFTAddress);
  }

  modifier onlyOracle() {
    require(msg.sender == oracleAddress, "Only oracle can call this function");
    _;
  }

  function setOracleAddress(address newOracleAddress) public {
    oracleAddress = newOracleAddress;
  }

  function setMonsterNFTAddress(address newMonsterNFTAddress) public {
    monsterNFT = IMonsterNFT(newMonsterNFTAddress);
  }

  function analyze(string memory message) public returns (uint256) {
    uint256 currentId = callsCount;
    callsCount = currentId + 1;

    llmMessage = IGaladrielOracle.Message({
      role: "user",
      content: new IGaladrielOracle.Content[](1)
    });
    llmMessage.content[0] = IGaladrielOracle.Content({
      contentType: "text",
      value: string(
        abi.encodePacked(
          "You are a creative director in a game company and known as a talented solidity dev. Analyze this transaction and create monster from code. Then estimate complexity and attack param of monster. ",
          message
        )
      )
    });
    callers[currentId] = msg.sender;

    IGaladrielOracle(oracleAddress).createOpenAiLlmCall(
      currentId,
      IGaladrielOracle.OpenAiRequest({
        model: "gpt-4o-2024-08-06",
        frequencyPenalty: 21, // > 20 for null
        logitBias: "", // empty str for null
        maxTokens: 1000, // 0 for null
        presencePenalty: 21, // > 20 for null
        responseFormat: '{"type":"json_schema","json_schema":{"name":"analysis","strict":true,"schema":{"type":"object","properties":{"analysis":{"type":"string"},"complexity":{"type":"number"},"attack":{"type":"number"}}}}}',
        seed: 0, // null
        stop: "", // null
        temperature: 10, // Example temperature (scaled up, 10 means 1.0), > 20 means null
        topP: 50, // Percentage 0-100, > 100 means null
        tools: "",
        toolChoice: "", // "none" or "auto"
        user: "" // null
      })
    );

    return currentId;
  }

  function _requestGenerateImage(
    uint256 callId,
    IMonsterNFT.Parameters memory parameters
  ) private {
    IGaladrielOracle(oracleAddress).createFunctionCall(
      callId,
      "image_generation",
      string(
        abi.encodePacked(
          "Generate a monster image from this parameters name: ",
          parameters.name,
          " description: ",
          parameters.description,
          " health: ",
          parameters.health,
          " attack: ",
          parameters.attack,
          " defense: ",
          parameters.defense,
          " speed: ",
          parameters.speed,
          " magic: ",
          parameters.magic
        )
      )
    );
  }

  function onOracleFunctionResponse(
    uint256 callId,
    string memory response,
    string memory errorMessage
  ) public onlyOracle {
    if (bytes(errorMessage).length > 0) {
      return;
    }

    uint256 tokenId = callIdToTokenId[callId];

    monsterNFT.setImage(tokenId, response);
  }

  function onOracleOpenAiLlmResponse(
    uint256 callId,
    IGaladrielOracle.OpenAiResponse memory response,
    string memory errorMessage
  ) public onlyOracle {
    if (bytes(errorMessage).length > 0) {
      return;
    }

    AnalysisResult memory analysisResult = _parseAnalysisResult(
      response.content
    );

    uint256 tokenId = monsterNFT.safeMint(callers[callId]);

    callIdToTokenId[callId] = tokenId;

    monsterNFT.setParameters(tokenId, analysisResult.monsterParameters);
    _requestGenerateImage(callId, analysisResult.monsterParameters);

    emit Analized(
      callId,
      analysisResult.data.targetContract,
      analysisResult.data.functionName,
      analysisResult.data.description,
      analysisResult.data.value,
      analysisResult.data.complexity,
      analysisResult.data.riskLevel
    );
  }

  function _parseAnalysisResult(
    bytes memory content
  ) private pure returns (AnalysisResult memory) {
    (
      AnalysisData memory data,
      IMonsterNFT.Parameters memory monsterParameters
    ) = abi.decode(content, (AnalysisData, IMonsterNFT.Parameters));

    return AnalysisResult({data: data, monsterParameters: monsterParameters});
  }
}
