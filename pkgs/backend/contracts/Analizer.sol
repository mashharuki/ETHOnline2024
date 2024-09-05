// SPDX-License-Identifier: MIT

pragma solidity ^0.8.25;

import "./interfaces/galadriel/IOracle.sol";

contract Analizer {
  address public oracleAddress;
  IOracle.Message llmMessage;
  string public lastResponse;
  string public lastError;
  uint private callsCount;

  constructor(address _oracleAddress) {
    oracleAddress = _oracleAddress;
  }

  modifier onlyOracle() {
    require(msg.sender == oracleAddress, "Only oracle can call this function");
    _;
  }

  function setOracleAddress(address newOracleAddress) public {
    oracleAddress = newOracleAddress;
  }

  function callFunction(
    string memory name,
    string memory message
  ) public returns (uint i) {
    uint currentId = callsCount;
    callsCount = currentId + 1;

    lastResponse = "";
    lastError = "";

    IOracle(oracleAddress).createFunctionCall(currentId, name, message);

    return currentId;
  }

  function callOpenAiLLM(
    string memory model,
    string memory message
  ) public returns (uint i) {
    uint currentId = callsCount;
    callsCount = currentId + 1;

    llmMessage = IOracle.Message({
      role: "user",
      content: new IOracle.Content[](1)
    });
    llmMessage.content[0] = IOracle.Content({
      contentType: "text",
      value: string(
        abi.encodePacked(
          "You are a creative director in a game company and known as a talented solidity dev. Analyze this transaction and create monster from code. Then estimate complexity and attack param of monster. ",
          message
        )
      )
    });
    lastResponse = "";
    lastError = "";

    IOracle(oracleAddress).createOpenAiLlmCall(
      currentId,
      IOracle.OpenAiRequest({
        model: model,
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

  function getMessageHistory(
    uint /*chatId*/
  ) public view returns (IOracle.Message[] memory) {
    IOracle.Message[] memory messages = new IOracle.Message[](1);
    messages[0] = llmMessage;
    return messages;
  }

  function onOracleFunctionResponse(
    uint /*runId*/,
    string memory response,
    string memory errorMessage
  ) public onlyOracle {
    lastResponse = response;
    lastError = errorMessage;
  }

  function onOracleKnowledgeBaseQueryResponse(
    uint /*runId*/,
    string[] memory documents,
    string memory errorMessage
  ) public onlyOracle {
    string memory newContent = "";
    for (uint i = 0; i < documents.length; i++) {
      newContent = string(abi.encodePacked(newContent, documents[i], "\n"));
    }
    lastResponse = newContent;
    lastError = errorMessage;
  }

  function onOracleLlmResponse(
    uint /*runId*/,
    IOracle.LlmResponse memory response,
    string memory errorMessage
  ) public onlyOracle {
    lastResponse = response.content;
    lastError = errorMessage;
  }

  function onOracleOpenAiLlmResponse(
    uint /*runId*/,
    IOracle.OpenAiResponse memory response,
    string memory errorMessage
  ) public onlyOracle {
    lastResponse = response.content;
    lastError = errorMessage;
  }

  function onOracleGroqLlmResponse(
    uint /*runId*/,
    IOracle.GroqResponse memory response,
    string memory errorMessage
  ) public onlyOracle {
    lastResponse = response.content;
    lastError = errorMessage;
  }
}
