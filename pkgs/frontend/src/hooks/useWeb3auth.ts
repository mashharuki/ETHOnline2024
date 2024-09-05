import {useAtom} from "jotai";
import {authAtom} from "@/store";
import {web3auth} from "@/utils/web3auth";

export default function useWeb3auth() {
  const [auth, setAuth] = useAtom(authAtom);

  const init = async () => {
    try {
      await web3auth.initModal();
      setAuth({
        isLoggedIn: web3auth.connected,
        provider: web3auth.provider,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setAuth({
      isLoggedIn: web3auth.connected,
      provider: web3authProvider,
    });
  };

  return {init, auth, login};
}