import type {IProvider} from "@web3auth/base";
import {
  createPublicClient,
  createWalletClient,
  custom,
  defineChain,
  formatEther,
  parseEther,
} from "viem";
import {mainnet, sepolia} from "viem/chains";

const galadrielDevnet = defineChain({
  id: 696969,
  name: "Galadriel Devnet",
  nativeCurrency: {name: "Galadriel", symbol: "GAL", decimals: 18},
  rpcUrls: {
    default: {
      http: ["https://devnet.galadriel.com"],
    },
  },
});

const getViewChain = (provider: IProvider) => {
  switch (provider.chainId) {
    case "1":
      return mainnet;
    case "0xaa36a7":
      return sepolia;
    case "0xAA289":
      return galadrielDevnet;
    default:
      return mainnet;
  }
};

const getChainId = async (provider: IProvider): Promise<any> => {
  try {
    const walletClient = createWalletClient({
      transport: custom(provider),
    });

    const address = await walletClient.getAddresses();
    console.log(address);

    const chainId = await walletClient.getChainId();
    return chainId.toString();
  } catch (error) {
    return error;
  }
};

export const getAccounts = async (provider: IProvider): Promise<any> => {
  try {
    const walletClient = createWalletClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    const address = await walletClient.getAddresses();

    return address;
  } catch (error) {
    return error;
  }
};

export const getBalance = async (provider: IProvider): Promise<string> => {
  try {
    const publicClient = createPublicClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    const walletClient = createWalletClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    const address = await walletClient.getAddresses();

    const balance = await publicClient.getBalance({address: address[0]});
    console.log(balance);
    return formatEther(balance);
  } catch (error) {
    return error as string;
  }
};

const sendTransaction = async (provider: IProvider): Promise<any> => {
  try {
    const publicClient = createPublicClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    const walletClient = createWalletClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    // data for the transaction
    const destination = "0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56";
    const amount = parseEther("0.0001");
    const address = await walletClient.getAddresses();

    // Submit transaction to the blockchain
    const hash = await walletClient.sendTransaction({
      account: address[0],
      to: destination,
      value: amount,
    });
    console.log(hash);
    const receipt = await publicClient.waitForTransactionReceipt({hash});

    return JSON.stringify(
      receipt,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );
  } catch (error) {
    return error;
  }
};

const signMessage = async (provider: IProvider): Promise<any> => {
  try {
    const walletClient = createWalletClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    // data for signing
    const address = await walletClient.getAddresses();
    const originalMessage = "YOUR_MESSAGE";

    // Sign the message
    const hash = await walletClient.signMessage({
      account: address[0],
      message: originalMessage,
    });

    console.log(hash);

    return hash.toString();
  } catch (error) {
    return error;
  }
};

export const callReadFunction = async (
  provider: IProvider,
  contractAddress: string,
  abi: any,
  functionName: string,
  args: any[]
): Promise<any> => {
  const publicClient = createPublicClient({
    chain: getViewChain(provider),
    transport: custom(provider),
  });

  // data for the read function
  const data = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: abi,
    functionName: functionName,
    args: [args],
  });

  return data;
};

export const callWriteFunction = async (
  provider: any,
  contractAddress: string,
  abi: any,
  functionName: string,
  args: any[]
) => {
  try {
    console.log("provider:::", provider.chainId);

    console.log("args", args);

    const walletClient = createWalletClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    const address = await walletClient.getAddresses();
    // data for the write function
    const txHash = await walletClient.writeContract({
      address: contractAddress as `0x${string}`,
      abi: abi,
      functionName: functionName,
      args: ["0xdC00bE7034C949053713117bc6FA3F4897C9c033"],
      account: address[0],
    });
    console.log("txHash:::", txHash);
  } catch (error) {
    console.error(" error occured when callWriteFunction", error);
  }
};

export default {
  getChainId,
  getAccounts,
  getBalance,
  sendTransaction,
  signMessage,
  callReadFunction,
  callWriteFunction,
};
