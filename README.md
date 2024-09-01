# ETHOnline2024

![](./docs/img/cover_logo.png)

## Overview

## Live Demo

## Slide

## Product name

Responsible Web3

## Short description

## description

## How it's made

## Related Contract Addresses

- ### Sepolia

  | Name | Address | Memo |
  | ---- | ------- | ---- |
  |      |         |      |

- ### Galadriel

  | Name  | Address                                    | Memo |
  | ----- | ------------------------------------------ | ---- |
  | Agent | 0xEf9310Ec551024585b1a290B286276B58d795EFc |      |

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

        BICONOMY_API_KEY=""
        BICONOMY_BUNLDER_API_KEY=""

        # Base Sepolia
        NFT_ADDRESS="0x149920786500a12da84185df4b4aaabe975df5f8"

        # Chainlink CCIP
        SEPOLIA_RPC_URL="https://rpc.ankr.com/eth_sepolia"
        DESTINATION_MINTER_ADDRESS="0xA433938c78A781E1f6c79f7F8BE2C200cb6bC046"
        SOURCE_MINTER_ADDRESS="0x08c49b662c0c2A5D5f0560E01eE3c3fEdF8938d9"
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

  - **verify contract**

    ```bash
    yarn backend verify --contract contracts/tableland/TxDB.sol:TxDB <address> --network <network name>
    ```

  - **TableLand**

    - **setAccessControl task**

      ```bash
      yarn backend setAccessControl --network <network name>
      ```

    - **insertData task**

      ```bash
      yarn backend insertData --network <network name>
      ```

  - **Chainlink CCIP**

    - **deploy NFT & destination Contract**

      ```bash
      yarn backend deploy-destination-cross-chain-nft-minter --network baseSepolia
      ```

    - **deploy SourceMinter contract**

      ```bash
      yarn backend deploy-source-cross-chain-nft-minter --network sepolia
      ```

      & you should send LINK token to SourceMinter Contract

    - **mint CrossChainNFT**

      ```bash
      yarn backend crossChainMint --destination baseSepolia --to 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072 --fee LINK --network sepolia
      ```

      [CrossChain Mint NFT Tx](https://ccip.chain.link/msg/0x1f389be6f625b0ed688d97c8e1ea68e74e4081aa663691269bda79b643f51172)

      [Rarible Minted NFT](https://testnet.rarible.com/token/base/0x149920786500a12da84185df4b4aaabe975df5f8:0)

## Sample NFT's metadata URI

[here](https://bafybeicfsjwjtdlt67nkfoxsma4cyl4zsjjyqtn27rgnpno5gr2zd5yf34.ipfs.w3s.link/sample)

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
21. [Eth2Vec: 深層学習による言語処理に基づいたスマートコントラクトの安全性解析ツールの設計](https://cir.nii.ac.jp/crid/1050855522064873472)
22. [GitHub - Eth2Vec](https://github.com/fseclab-osaka/eth2vec)
23. [TableLand Studio](https://studio.tableland.xyz/)
24. [Chainlink CCIP Supported Testnet Networks](https://docs.chain.link/ccip/supported-networks/v1_2_0/testnet)
25. [Chainlink CCIP Sepolia info](https://docs.chain.link/ccip/supported-networks/v1_2_0/testnet#ethereum-sepolia)
26. [Chainlink CCIP CrossChainGuide](https://github.com/smartcontractkit/ccip-starter-kit-hardhat/blob/main/README.md#example-7---execute-received-message-as-a-function-call)
27. [Chainlink CCIP Explorer](https://ccip.chain.link/)
28. [Kinto Wallet SDK](https://docs.kinto.xyz/kinto-the-safe-l2/building-on-kinto/kinto-wallet-web-sdk)
29. [GitHub - Kinto Wallet SDK](https://github.com/KintoXYZ/kinto-web-sdk)
30. [GitHub - Kinto Wallet SDK Sample](https://github.com/KintoXYZ/react-sdk-sample)
31. [jiffyscan](https://jiffyscan.xyz/?network=mainnet)
32. [Medium - 💻 Kinto launches Wallet SDK](https://medium.com/mamori-finance/kinto-launches-the-wallet-sdk-239a88265f17)
33. [HederaScan - Testnet](https://hashscan.io/testnet/dashboard?p2=1&k2=1725160501.286348003&p3=1&k3=1725148802.532220003&p1=1&k1=1725160501.170967003)
34. [BlockHead](https://blockhead.info/apps)
35. [Web3Auth - Examples](https://web3auth.io/docs/examples?product=Core+Kit&sdk=Single+Factor+Auth+Web+SDK)
36. [pnp-modal-playground.vercel.app](https://pnp-modal-playground.vercel.app/)
37. [Web3Auth pnp-modal-playground Samplecode](https://github.com/Web3Auth/web3auth-pnp-examples/tree/main/web-modal-sdk/react-modal-playground)
38. [Decoding EntryPoint code line by line](https://www.biconomy.io/post/decoding-entrypoint-and-useroperation-with-erc-4337-part2)
39. [GitHub - galadriel-ai/teeML](https://github.com/galadriel-ai/teeML)
40. [Galadriel Docs - AI Agents](https://docs.galadriel.com/tutorials/agents)
