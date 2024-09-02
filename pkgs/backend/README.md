# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

## Deploy

<details>
<summary>Deploy NFT</summary>

- change directory

```bash
cd ../../
```

- holesky

```bash
yarn backend deploy:nft --network holesky
```

- hederaTestnet

```bash
yarn backend deploy:nft --network hederaTestnet
```

- rskTestnet

```bash
yarn backend deploy:nft --network rskTestnet
```

- galadrielDevnet

```bash
yarn backend deploy:nft --network galadrielDevnet
```

- chilizTestnet

```bash
yarn backend deploy:nft --network chilizTestnet
```

- morphTestnet

```bash
yarn backend deploy:nft --network morphTestnet
```

</details>

## Contract Address

| Network | Contract Name | Contract Address | Explorer |
| ------- | ----------------- | ----------------- | -------- |
| fhenix | BaseNft | 0xAc0DE957C2474519744270f47DEef57FFF088F60 | [https://explorer.helium.fhenix.zone/address/0xAc0DE957C2474519744270f47DEef57FFF088F60](https://explorer.helium.fhenix.zone/address/0xAc0DE957C2474519744270f47DEef57FFF088F60) |
| holesky | BaseNft | 0x95a8eD5026AC829C4F02c051C2553891c9fD98C7 | [https://holesky.etherscan.io/address/0x95a8eD5026AC829C4F02c051C2553891c9fD98C7](https://holesky.etherscan.io/address/0x95a8eD5026AC829C4F02c051C2553891c9fD98C7) |
| hederaTestnet | BaseNft | 0xAc0DE957C2474519744270f47DEef57FFF088F60 | [https://explorer.arkhia.io/testnet/contract/0.0.4799318](https://explorer.arkhia.io/testnet/contract/0.0.4799318) |
| rskTestnet | BaseNft | 0xAc0DE957C2474519744270f47DEef57FFF088F60 | [https://explorer.testnet.rootstock.io/address/0xac0de957c2474519744270f47deef57fff088f60](https://explorer.testnet.rootstock.io/address/0xac0de957c2474519744270f47deef57fff088f60) |
| galadrielDevnet | BaseNft | 0xAc0DE957C2474519744270f47DEef57FFF088F60 | [https://explorer.galadriel.com/address/0xAc0DE957C2474519744270f47DEef57FFF088F60](https://explorer.galadriel.com/address/0xAc0DE957C2474519744270f47DEef57FFF088F60) |
| chilizTestnet | BaseNft | 0xAc0DE957C2474519744270f47DEef57FFF088F60 | [https://testnet.chiliscan.com/address/0xAc0DE957C2474519744270f47DEef57FFF088F60](https://testnet.chiliscan.com/address/0xAc0DE957C2474519744270f47DEef57FFF088F60) |
| morphTestnet | BaseNft | 0xAc0DE957C2474519744270f47DEef57FFF088F60 | [https://explorer-holesky.morphl2.io/address/0xAc0DE957C2474519744270f47DEef57FFF088F60](https://explorer-holesky.morphl2.io/address/0xAc0DE957C2474519744270f47DEef57FFF088F60) |
| ONFT | Amoy | 0x95a8eD5026AC829C4F02c051C2553891c9fD98C7 | |
| ONFT | Holesky | 0x4112575fF3F68f5C7ee0eAae1Fa11516105E6a3f | |
