// import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
// import { expect } from 'chai'
// import { Contract } from 'ethers'
// import hre from 'hardhat'

// import { Options } from '@layerzerolabs/lz-v2-utilities'

// describe('MyONFT721 Test', function () {
//     const { deployments } = hre
//     const holeskyEid = 40217
//     const amoyEid = 40267
//     let holeskyONFT: Contract
//     const holeskyONFTAddress = '0x4112575fF3F68f5C7ee0eAae1Fa11516105E6a3f'
//     let amoyONFT: Contract
//     const amoyONFTAddress = '0x95a8eD5026AC829C4F02c051C2553891c9fD98C7'
//     let holeskyEndpointA: Contract
//     const holeskyEndpointAddress = '0x6EDCE65403992e310A62460808c4b910D972f10f'
//     let amoyEndpointB: Contract
//     const amoyEndpointAddress = '0x6EDCE65403992e310A62460808c4b910D972f10f'

//     const privateKey = process.env.PRIVATE_KEY
//     const privateKey2 = process.env.PRIVATE_KEY_2
//     if (!privateKey || !privateKey2) {
//         throw new Error('PRIVATE_KEY or PRIVATE_KEY_2 is not set')
//     }
//     const providerHolesky = hre.ethers.getDefaultProvider('https://1rpc.io/holesky')
//     const providerAmoy = hre.ethers.getDefaultProvider('https://polygon-amoy.drpc.org')

//     const walletOwnerA = new hre.ethers.Wallet(privateKey, providerHolesky)
//     const walletOwnerB = new hre.ethers.Wallet(privateKey2, providerAmoy)

//     before(async function () {
//         holeskyONFT = await hre.ethers.getContractAt('MyONFT721Mock', holeskyONFTAddress, walletOwnerA)
//         amoyONFT = await hre.ethers.getContractAt('MyONFT721Mock', amoyONFTAddress, walletOwnerB)
//         console.log(`holeskyONFT.address: ${holeskyONFT.address}`)
//         console.log(`amoyONFT.address: ${amoyONFT.address}`)
//         const EndpointV2MockArtifact = await deployments.getArtifact('EndpointV2Mock')
//         holeskyEndpointA = await hre.ethers.getContractAt(
//             EndpointV2MockArtifact.abi,
//             holeskyEndpointAddress,
//             walletOwnerA
//         )
//         console.log(`holeskyEndpointA: ${holeskyEndpointA.address}`)
//         amoyEndpointB = await hre.ethers.getContractAt(EndpointV2MockArtifact.abi, amoyEndpointAddress, walletOwnerB)
//         console.log(`amoyEndpointB: ${amoyEndpointB.address}`)
//     })

//     beforeEach(async function () {
//         const feeDataHolesky = await providerHolesky.getFeeData()
//         const feeDataAmoy = await providerAmoy.getFeeData()
//         console.log(`feeDataHolesky: ${feeDataHolesky}`)
//         console.log(`feeDataAmoy: ${feeDataAmoy}`)

//         // await holeskyEndpointA.setDestLzEndpoint(amoyONFT.address, amoyEndpointB.address, {
//         //     gasPrice: feeDataHolesky.gasPrice,
//         // })
//         // console.log('done holeskyEndpointA.setDestLzEndpoint')
//         // await amoyEndpointB.setDestLzEndpoint(holeskyONFT.address, holeskyEndpointA.address, {
//         //     gasPrice: feeDataAmoy.gasPrice,
//         // })
//         // console.log('done amoyEndpointB.setDestLzEndpoint')

//         // await holeskyONFT.connect(walletOwnerA).setPeer(amoyEid, hre.ethers.utils.hexZeroPad(amoyONFT.address, 32), {
//         //     gasPrice: feeDataHolesky.gasPrice,
//         // })
//         // console.log('done holeskyONFT.connect(walletOwnerA).setPeer')
//         // await amoyONFT.connect(walletOwnerB).setPeer(holeskyEid, hre.ethers.utils.hexZeroPad(holeskyONFT.address, 32), {
//         //     gasPrice: feeDataAmoy.gasPrice,
//         // })
//         // console.log('done amoyONFT.connect(walletOwnerB).setPeer')
//     })

//     it('should send a token from A address to B address via each ONFT721', async function () {
//         const feeDataHolesky = await providerHolesky.getFeeData()
//         const tokenId = 3
//         await holeskyONFT.connect(walletOwnerA).mint(walletOwnerA.address, tokenId, {
//             gasPrice: feeDataHolesky.gasPrice,
//         })
//         console.log('minted')

//         const beforeOwnerABalance = await holeskyONFT.balanceOf(walletOwnerA.address)
//         const beforeOwnerBBalance = await holeskyONFT.balanceOf(walletOwnerB.address)
//         console.log(`beforeOwnerABalance: ${beforeOwnerABalance}`)
//         console.log(`beforeOwnerBBalance: ${beforeOwnerBBalance}`)

//         expect(beforeOwnerABalance.gt(1)).to.be.true
//         expect(beforeOwnerBBalance.eq(0)).to.be.true

//         const executorOption = Options.newOptions().addExecutorLzReceiveOption(2000000000000000, 0).toHex()

//         const sendParam = {
//             dstEid: amoyEid,
//             to: hre.ethers.utils.hexZeroPad(walletOwnerB.address, 32),
//             tokenId: tokenId,
//             extraOptions: executorOption,
//             composeMsg: [],
//             onftCmd: [],
//         }

//         console.log(sendParam)

//         const feeDataHolesky2 = await providerHolesky.getFeeData()
//         const feeDataAmoy2 = await providerAmoy.getFeeData()

//         const msgFee = {
//             nativeFee: hre.ethers.utils.parseEther('0.1'),
//             lzTokenFee: hre.ethers.utils.parseEther('0'),
//         }

//         console.log(msgFee)
//         const tx = await holeskyONFT.connect(walletOwnerA).send(sendParam, msgFee, walletOwnerA.address)
//         console.log(`tx: ${tx.hash}`)
//         await tx.wait()

//         console.log('sent')

//         console.log('sent')

//         const ownerBFinalBalance = await amoyONFT.balanceOf(walletOwnerB.address)

//         expect(ownerBFinalBalance.eq(1)).to.be.true
//     })
// })
