"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RedImage from "@/assets/red-transparent.png";
import BlueImage from "@/assets/blue-transparent.png";

const goToHome = (router) => {
  router.push("/home");
};

function App() {
  const router = useRouter();

  return (
    <div className="px-6 min-h-screen mt-6">
      <div className="nes-balloon w-full text-3xl text-center">
        Choose your team
      </div>
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
    </div>
  );
}

export default App;
