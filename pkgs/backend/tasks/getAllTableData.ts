import {Database} from "@tableland/sdk";
import "dotenv/config";
import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";

interface TableData {
  id: number;
  table_id: string;
  table_name: string;
  tx_id: string;
  tx_index: string;
  from: string;
  to: string;
  data: string;
  signature: string;
  plaintext: string;
}

task("getAllTableData", "Prints all table Data")
  .addParam("tablename", "The table's name")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    // Create a database connection
    const db = new Database();

    // sample transaction_table_11155111_1767
    const {results} = await db
      .prepare(`SELECT * FROM ${taskArgs.tablename};`)
      .all<TableData>();
    console.log("results:", results);
  });
