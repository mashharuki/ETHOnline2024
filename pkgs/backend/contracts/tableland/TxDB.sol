// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10 <0.9.0;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {TablelandController} from "@tableland/evm/contracts/TablelandController.sol";
import {TablelandPolicy} from "@tableland/evm/contracts/TablelandPolicy.sol";
import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

/**
 * @title TxDB Contract
 * @author HarukiKondo
 * @notice This is a Transaction DataBase Contract
 */
contract TxDB is TablelandController, ERC721Holder {
  uint256 private tableId;
  string private tableName;
  string private constant _TABLE_PREFIX = "transaction_table";
  bytes32 private rootHash;
  address public owner;

  /// events

  event TableCreated(uint256 tableId, string tableName, address owner);
  event Insert(uint256 tableId, string tableName, string addressField, string chainId);
  event Update(uint256 tableId, string tableName, string addressField, string chainId);
  event Delete(uint256 tableId, string tableName, string addressField, string chainId);

  modifier onlyOwner() {
    require(msg.sender == owner, "msg.sender must be owner");
    _;
  }

  /**
   * constructor
   */
  constructor() {
    // Create a table
    tableId = TablelandDeployments.get().create(
      address(this),
      SQLHelpers.toCreateFromSchema(
        "id integer primary key,"
        "address text,"
        "chainId text,"
        "from text,"
        "to text,"
        "data text,"
        "signature text,"
        "plaintext text",
        _TABLE_PREFIX
      )
    );
    tableName = SQLHelpers.toNameFromId(_TABLE_PREFIX, tableId);
    // Set owner
    owner = msg.sender;
    // Emit event
    emit TableCreated(tableId, tableName, msg.sender);
  }

  /**
   * Insert a row transaction data into the table from an external call
   */
  function insertTransaction(
    string memory _address,
    string memory _chainId,
    string memory _from,
    string memory _to,
    string memory _data,
    string memory _signature,
    string memory _plaintext
  ) external {
    TablelandDeployments.get().mutate(
      address(this),
      tableId,
      SQLHelpers.toInsert(
        _TABLE_PREFIX,
        tableId,
        "address, chainId, from, to, data, signature, plaintext",
        string.concat(
          SQLHelpers.quote(_address),
          ",",
          SQLHelpers.quote(_chainId),
          ",",
          SQLHelpers.quote(_from),
          ",",
          SQLHelpers.quote(_to),
          ",",
          SQLHelpers.quote(_data),
          ",",
          SQLHelpers.quote(_signature),
          ",",
          SQLHelpers.quote(_plaintext)
        )
      )
    );
    emit Insert(tableId, tableName, _address, _chainId);
  }

  /**
   * Update a row in the table
   */
  function updateTransaction(
    string memory _address,
    string memory _chainId,
    string memory _from,
    string memory _to,
    string memory _data,
    string memory _signature,
    string memory _plaintext
  ) external {
    string memory setters = string.concat(
      "from=", SQLHelpers.quote(_from), ",",
      "to=", SQLHelpers.quote(_to), ",",
      "data=", SQLHelpers.quote(_data), ",",
      "signature=", SQLHelpers.quote(_signature), ",",
      "plaintext=", SQLHelpers.quote(_plaintext)
    );
    string memory filters = string.concat(
      "address=", SQLHelpers.quote(_address), " AND chainId=", SQLHelpers.quote(_chainId)
    );
    TablelandDeployments.get().mutate(
      address(this),
      tableId,
      SQLHelpers.toUpdate(_TABLE_PREFIX, tableId, setters, filters)
    );
    emit Update(tableId, tableName, _address, _chainId);
  }

  /**
   * Delete a row from the table
   */
  function deleteTransaction(string memory _address, string memory _chainId) external {
    string memory filters = string.concat(
      "address=", SQLHelpers.quote(_address), " AND chainId=", SQLHelpers.quote(_chainId)
    );
    TablelandDeployments.get().mutate(
      address(this),
      tableId,
      SQLHelpers.toDelete(_TABLE_PREFIX, tableId, filters)
    );
    emit Delete(tableId, tableName, _address, _chainId);
  }
  
  /**
   * Dynamic ACL controller policy that allows any inserts, updates, and deletes
   */
  function getPolicy(
    address,
    uint256
  ) public payable override returns (TablelandPolicy memory) {
    string[] memory updatableColumns = new string[](5);

    updatableColumns[0] = "from";
    updatableColumns[1] = "to";
    updatableColumns[2] = "data";
    updatableColumns[3] = "signature";
    updatableColumns[4] = "plaintext";
    return
      TablelandPolicy({
        allowInsert: true,
        allowUpdate: true,
        allowDelete: true,
        whereClause: "",
        withCheck: "",
        updatableColumns: updatableColumns
      });
  }

  /**
   * set ACL function
   */
  function setAccessControl() public onlyOwner {
    TablelandDeployments.get().setController(
      address(this),
      tableId,
      address(this)
    );
  }


  /**
   * gat talbleName
   */
  function getTableName() external view returns (string memory) {
    return SQLHelpers.toNameFromId(_TABLE_PREFIX, tableId);
  }

  /**
   * gat talbleId
   */
  function getTableId() external view returns (uint256) {
    return tableId;
  }

  /**
   * fallback function
   */
  receive() external payable {}  
  fallback() external payable {}
}