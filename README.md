# ETHOnline2024

This repo for ETHOnline2024

![](./docs/img/cover_logo.png)

# Overview

## Live Demo

## Slide

## Product name

## Short description

## description

## How it's made

## How to work

- **setup**

  install

  ```bash
  yarn
  ```

  - **backend**

    1.  create `pkgs/backend/.env` file

    2.  set some values

        ```txt
        PRIVATE_KEY=
        INFURA_API_KEY=
        ETHERSCAN_API_KEY=
        ROOTSTACK_API_KEY=
        GAS_REPORT=true
        COINMARKETCAP_API_KEY=
        ```

  - **frontend**

  - **scripts**

    1.  create `pkgs/scripts/.env` file

    2.  set some values

        ```txt
        CHAIN_ID=696969
        RPC_URL="https://devnet.galadriel.com/"
        PRIVATE_KEY=""
        CHAT_CONTRACT_ADDRESS="0x4A5e76a1aEa072BF32a71A61F52FC1f410AAd748"
        CHAT_VISION_CONTRACT_ADDRESS="0x785578B0dA5F21F8321590981E15F618BBc1915c"
        AGENT_CONTRACT_ADDRESS="0xFb09a7a940ae690Fafc59e18310c4deBF75B1B52"
        ANTROPIC_CONTRACT_ADDRESS="0x8cA1e115f96A562418968B475c1F096a8A385Ddb"
        SIMPLE_LLM_CONTRACT_ADDRESS="0xd09dFE5025FB25000aA22021F7355656cd10EB17"
        COINMARKETCAP_API_KEY=
        ```

- **frontend**

  - **build frontend**

    ```bash
    yarn frontend build
    ```

  - **start frontend**

    ```bash
    yarn frontend dev
    ```

- **backend**

  - **create contract addresses json file**

    please set --network option value

    ```bash
    yarn backend setup --network <network name>
    ```

  - **compile backend**

    ```bash
    yarn backend compile
    ```

  - **test backend**

    ```bash
    yarn backend test
    ```

  - **deploy backend**

    please set --network option value

    ```bash
    yarn backend deploy --network <network name>
    ```

- **scripts**

  - **call SIMPLE_LLM_CONTRACT's sendMessage function**

    ```bash
    yarn scripts simpleChat
    ```

### reference

1. [ERH Online2024](https://ethglobal.com/events/ethonline2024)
2. [Hedera Dev Protal](https://portal.hedera.com/login)
3. [Hedera Getting Started](https://hedera.com/getting-started)
4. [Hedera Hardhat Template Project](https://github.com/hashgraph/hedera-hardhat-example-project/blob/main/.env.example)
5. [rootstock-hardhat-starterkit Template Kit](https://github.com/rsksmart/rootstock-hardhat-starterkit)
6. [rootstock hardhat set config](https://dev.rootstock.io/developers/smart-contracts/hardhat/configure-hardhat-rootstock/)
7. [rootstock dev portal](https://rpc.rootstock.io/)
8. [rootstock faucet](https://faucet.rootstock.io/)
9. [Galadriel DevNet explorer](https://explorer.galadriel.com)
10. [Chiliz RPC Endpoint info](https://docs.chiliz.com/develop/basics/connect-to-chiliz-chain/connect-using-rpc)
11. [SSV Network - Faucet](https://faucet.ssv.network/)
12. [Morph hardhat template repo](https://github.com/varun-doshi/morph-examples/tree/main/contract-deployment-demos/hardhat-demo)
13. [Blog- how to build sample app on Morph ](https://blog.morphl2.io/developer-guide-building-a-decentralized-hotel-booking-system-on-morph-2/)
14. [Morph - faucet site](https://morph-token-faucet.vercel.app/)
15. [Morph Bridge site holesky - Morph](https://bridge-holesky.morphl2.io/)
16. [Morph BlockExplorer](https://explorer-holesky.morphl2.io/address/0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072)
17. [Galadriel HP](https://teeml.galadriel.com/)
18. [Galadriel Devnet Explorer](https://explorer.galadriel.com/address/0x68EC9556830AD097D661Df2557FBCeC166a0A075)
19. [GitHub - Galadriel sample contract](https://github.com/galadriel-ai/contracts/tree/main)
20. [Galadriel Docs Calling an LLM: simple](https://docs.galadriel.com/tutorials/simple_llm)
