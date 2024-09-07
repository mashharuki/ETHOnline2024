"use client";
import { sampleQuery } from "@/graphql";
import useWeb3auth from "@/hooks/useWeb3auth";
import { useRouter } from "next/navigation";
import { useQuery } from "urql";

function App() {
  const { init, auth, login } = useWeb3auth();
  const router = useRouter();

  // ========================================================================
  // fetch query datas
  // ========================================================================

  //get attack info
  const [result] = useQuery({
    query: sampleQuery,
    variables: {},
  });
  const { data: sameples } = result;

  console.log("sameples:::", sameples);

  // useEffect(() => {
  //   console.log("init:::");
  //   init();
  // }, []);

  // useEffect(() => {
  //   console.log("auth:::", auth);
  //   if (auth.isLoggedIn) {
  //     router.push("/start");
  //   }
  // }, [auth]);

  return (
    <div className="grid place-items-center px-6 min-h-screen">
      <div className="-mt-40">
        <span className="nes-badge w-full mb-16">
          <span className="is-dark text-3xl text-center">Responsible Web3</span>
        </span>
        <div className="w-full flex items-center justify-center mb-14">
          <i className="nes-icon is-large like" />
        </div>
        <p className="nes-balloon from-left nes-pointer text-2xl w-full text-center overflow-wrap">
          Responsible web3 is aaaa aaaaaa aaaaaa aaaaaa bbbbbb
        </p>
      </div>
      <footer className="footer">
        <div className="wrapper px-6">
          <button onClick={login} className="nes-btn text-2xl mb-6 w-full">
            Start
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
