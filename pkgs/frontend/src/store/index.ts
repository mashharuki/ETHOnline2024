import {atom} from "jotai";
import {IProvider} from "@web3auth/base";

type IAuth = {
  isLoggedIn: boolean;
  provider: IProvider | null;
};

export const authAtom = atom<IAuth>({
  isLoggedIn: false,
  provider: null,
});
