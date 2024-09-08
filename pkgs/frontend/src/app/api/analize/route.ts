import AnalizerJson from "@/contracts/Analizer.sol/Analizer.json";
import {Contract, ethers} from "ethers";
import {NextApiRequest, NextApiResponse} from "next";

/**
 * analize API
 * @param req
 * @param res
 */
export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log(
    " ========================================= [analize: START] =============================================="
  );

  /// プロバイダーを作成
  const provider = new ethers.JsonRpcProvider("https://devnet.galadriel.com");

  // analizer
  const relayer = new ethers.Wallet(
    process.env.NEXT_PUBLIC_RELAYER_PRIVATE_KEY!,
    provider
  );
  // create analizer contract instance
  const analizer: any = new Contract(
    "0x8E25DDF6744f46e6BD2C021499E5a1A48312329D",
    AnalizerJson.abi,
    relayer
  ) as any;

  // call analize function
  const tx = await analizer.analyze(
    "0x0000189a000000000000000000000000f09e7827a72aeacc8ff7e7f8a1368f697a698e9300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002440d097c3000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac00000000000000000000000000000000000000000000000000000000"
  );

  console.log("tx:", tx);

  console.log(
    " ========================================= [analize: START] =============================================="
  );
}
