"use client";
import DragonImage from "@/assets/sample.png";
import MonsterNFTJson from "@/contracts/MonsterNFT.sol/MonsterNFT.json";
import useWeb3auth from "@/hooks/useWeb3auth";
import { callReadFunction, getAccounts, getBalance } from "@/utils/viemRPC";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const goToHome = (router: any) => {
  router.push("/start");
};

function App() {
  const router = useRouter();

  const { auth } = useWeb3auth();

  const [tokenId, setTokenId] = useState<number>(0);
  const [tokenData, setTokenData] = useState<any>(null);

  function getAttributeValue(
    attributes: any,
    traitType: string
  ): number | undefined {
    // trait_typeが一致するAttributeを検索
    const attribute = attributes.find(
      (attr: any) => attr.trait_type === traitType
    );

    // 見つかった場合はそのvalueを返す。見つからない場合はundefinedを返す。
    return attribute?.value;
  }

  function decodeBase64Json(base64Data: string): object {
    // 'data:application/json;base64,' の部分を削除して純粋なBase64データを取得
    const base64String = base64Data.replace(
      /^data:application\/json;base64,/,
      ""
    );

    // Base64データをデコードしてバイナリデータを取得
    const jsonString = Buffer.from(base64String, "base64").toString("utf-8");

    // デコードされた文字列をJSONオブジェクトとして解析
    return JSON.parse(jsonString);
  }

  const handleInputChange = (e: any) => {
    setTokenId(e.target.value);
  };

  /**
   * fetch token data method
   */
  const fetchTokenData = async () => {
    // tokenURIメソッドを呼び出す
    const data = await callReadFunction(
      auth.provider!,
      "0xdC00bE7034C949053713117bc6FA3F4897C9c033",
      MonsterNFTJson.abi,
      "tokenURI",
      [tokenId]
    );
    console.log("data:::", data);
    const decodedJson: any = decodeBase64Json(data);
    console.log("name:", decodedJson.name);

    // tokenURIのデータを取得
    const tokenURIData = {
      name: decodedJson.name,
      description: decodedJson.description,
      image: decodedJson.image,
      health: getAttributeValue(decodedJson.attributes, "Health"),
      attack: getAttributeValue(decodedJson.attributes, "Attack"),
      defense: getAttributeValue(decodedJson.attributes, "Defense"),
      speed: getAttributeValue(decodedJson.attributes, "Speed"),
      magic: getAttributeValue(decodedJson.attributes, "Magic"),
    };
    setTokenData(tokenURIData);
  };

  useEffect(() => {
    const init = async () => {
      // get address
      const address = await getAccounts(auth.provider!);
      console.log("address:::", address);
      // check balance
      const balance = await getBalance(auth.provider!);
      console.log("balance:::", balance);
    };
    init();
  }, []);

  return (
    <div className="px-6 min-h-screen mt-6">
      <div className="nes-balloon w-full text-3xl text-center">
        TokenURI Page
      </div>
      <div className="mt-4">
        <label htmlFor="tokenId" className="block text-lg">
          Enter Token ID:
        </label>
        <input
          type="text"
          id="tokenId"
          value={tokenId}
          onChange={handleInputChange}
          className="nes-input w-full"
        />
      </div>
      <button
        className="nes-balloon w-full bg-red-500/30 hover:bg-red-500/50"
        onClick={fetchTokenData}
      >
        get TokenURI
      </button>

      {tokenData && (
        <div className="mt-6 nes-container with-title">
          <h3 className="title">Token Details</h3>
          <p>
            <strong>Name:</strong> {tokenData.name}
          </p>
          <p>
            <strong>Description:</strong> {tokenData.description}
          </p>
          {/*<img src={tokenData.image} alt={tokenData.name} className="nes-img" />*/}
          <Image src={DragonImage} alt="red" />
          <p>
            <strong>Health:</strong> {tokenData.health}
          </p>
          <p>
            <strong>Attack:</strong> {tokenData.attack}
          </p>
          <p>
            <strong>Defense:</strong> {tokenData.defense}
          </p>
          <p>
            <strong>Speed:</strong> {tokenData.speed}
          </p>
          <p>
            <strong>Magic:</strong> {tokenData.magic}
          </p>
        </div>
      )}

      <footer className="footer">
        <div className="wrapper px-6">
          <button
            onClick={() => goToHome(router)}
            className="nes-btn text-2xl mb-6 w-full"
          >
            Go Start
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
