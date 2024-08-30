// import {Database} from "@tableland/sdk";
// import {expect} from "chai";
// import {ethers} from "hardhat";
// import {TxDB, TxDB__factory} from "../typechain-types";

// describe("TxDB contract", function () {
//   /**
//    * Deploy TxDB contract method
//    * @returns
//    */
//   async function deployTxDB() {
//     const [owner, addr1] = await ethers.getSigners();
//     // deploy TxDB contract
//     const TxDBFactory: TxDB__factory = await ethers.getContractFactory("TxDB");
//     const txDB: TxDB = await TxDBFactory.deploy();
//     // await txDB.waitForDeployment();
//     console.log("TxDB deployed to:", txDB.target);
//     // setController
//     await txDB.setAccessControl();
//     return {txDB, owner, addr1};
//   }

//   it("Should deploy and set the correct owner", async function () {
//     const {txDB, owner, addr1} = await deployTxDB();
//     expect(await txDB.owner()).to.equal(owner.address);
//   });

//   it("Should create a table on deployment", async function () {
//     const {txDB, owner, addr1} = await deployTxDB();
//     const tableName = await txDB.getTableName();
//     expect(tableName).to.be.a("string");
//   });

//   it("Should insert a transaction and emit Insert event", async function () {
//     const {txDB, owner, addr1} = await deployTxDB();
//     const tx = await txDB.insertTransaction(
//       "0x123",
//       "1",
//       "0xabc",
//       "0xdef",
//       "data",
//       "signature",
//       "plaintext"
//     );
//     await expect(tx)
//       .to.emit(txDB, "Insert")
//       .withArgs(
//         await txDB.getTableId(),
//         await txDB.getTableName(),
//         "0x123",
//         "1"
//       );
//   });

//   it("Should update a transaction and emit Update event", async function () {
//     const {txDB, owner, addr1} = await deployTxDB();
//     await txDB.insertTransaction(
//       "0x123",
//       "1",
//       "0xabc",
//       "0xdef",
//       "data",
//       "signature",
//       "plaintext"
//     );
//     const tx = await txDB.updateTransaction(
//       "0x123",
//       "1",
//       "0xnewFrom",
//       "0xnewTo",
//       "newData",
//       "newSignature",
//       "newPlaintext"
//     );
//     await expect(tx)
//       .to.emit(txDB, "Update")
//       .withArgs(
//         await txDB.getTableId(),
//         await txDB.getTableName(),
//         "0x123",
//         "1"
//       );
//   });

//   it("Should delete a transaction and emit Delete event", async function () {
//     const {txDB, owner, addr1} = await deployTxDB();
//     await txDB.insertTransaction(
//       "0x123",
//       "1",
//       "0xabc",
//       "0xdef",
//       "data",
//       "signature",
//       "plaintext"
//     );
//     const tx = await txDB.deleteTransaction("0x123", "1");
//     await expect(tx)
//       .to.emit(txDB, "Delete")
//       .withArgs(
//         await txDB.getTableId(),
//         await txDB.getTableName(),
//         "0x123",
//         "1"
//       );
//   });

//   it("Should allow only the owner to set access control", async function () {
//     const {txDB, owner, addr1} = await deployTxDB();
//     await txDB.setAccessControl();
//     await expect(txDB.connect(addr1).setAccessControl()).to.be.revertedWith(
//       "msg.sender must be owner"
//     );
//   });

//   it("get all transaction data", async function () {
//     const {txDB, owner, addr1} = await deployTxDB();
//     // Create a database connection
//     const db = new Database({signer: owner as any});

//     // get table name
//     const tableName = await txDB.getTableName();
//     // sample fileinfo_table_314159_705
//     const {results} = await db
//       .prepare(`SELECT * FROM ${tableName};`)
//       .all<any>();
//     console.log("results:", results);
//   });
// });
