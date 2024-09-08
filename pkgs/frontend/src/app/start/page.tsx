"use client";
import RedImage from "@/assets/red-transparent.png";
import AnalizerJson from "@/contracts/Analizer.sol/Analizer.json";
import useWeb3auth from "@/hooks/useWeb3auth";
import { callWriteFunction } from "@/utils/viemRPC";
import Image from "next/image";
import { useRouter } from "next/navigation";

const goToHome = (router: any) => {
  router.push("/home");
};

function App() {
  const router = useRouter();
  const { login, auth, logout } = useWeb3auth();

  /**
   * call Analaiser contract's analyze function
   * send callData of AA userOp
   */
  const analyze = async () => {
    console.log("auth.provider:", auth);

    if (auth.provider === undefined) {
      await login();
    }

    await callWriteFunction(
      auth.provider!,
      "0x8E25DDF6744f46e6BD2C021499E5a1A48312329D",
      AnalizerJson.abi,
      "analyze",
      [
        "0x0000189a000000000000000000000000f09e7827a72aeacc8ff7e7f8a1368f697a698e9300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002440d097c3000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac00000000000000000000000000000000000000000000000000000000".toString(),
      ]
    );
    /**/
  };

  return (
    <div className="px-6 min-h-screen mt-6">
      <div className="nes-balloon w-full text-3xl text-center">
        Analize Tx & Generate NFT Page
      </div>
      <button
        className="nes-balloon w-full bg-red-500/30 hover:bg-red-500/50"
        onClick={() => goToHome(router)}
      >
        <Image src={RedImage} alt="red" />
        <p className="text-red-600 text-4xl">Let's try!</p>
      </button>

      <div
        className="nes-balloon w-full text-3xl text-center bg-blue-300"
        onClick={analyze}
      >
        Analize Tx
      </div>

      <div className="wrapper px-6">
        <button onClick={logout} className="nes-btn text-2xl mb-6 w-full">
          logout
        </button>
      </div>

      {/*
      <button
        className="nes-balloon w-full bg-red-500/30 hover:bg-red-500/50"
        onClick={() => goToHome(router)}
      >
        <Image src={RedImage} alt="red" />
        <p className="text-red-600 text-4xl">TEAM RED</p>
      </button>
      <button
        className="nes-balloon w-full bg-blue-500/30 hover:bg-blue-500/50"
        onClick={() => goToHome(router)}
      >
        <Image src={BlueImage} alt="blue" />
        <p className="text-blue-600 text-4xl">TEAM BLUE</p>
      </button>
      */}
      <footer className="footer">
        <div className="wrapper px-6">
          <button
            onClick={() => router.push("/tokenuri")}
            className="nes-btn text-2xl mb-6 w-full"
          >
            Check TokenURI
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
