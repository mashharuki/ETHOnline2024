"use client";
import { Provider as JotaiProvider } from "jotai";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import useWeb3auth from "@/hooks/useWeb3auth";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { init, auth } = useWeb3auth();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    console.log("pathName", pathName, auth);
    if (pathName === "/") {
      if (auth.isLoggedIn) {
        router.push("/start");
      }
    } else {
      if (!auth.isLoggedIn) {
        router.push("/");
      }
    }
  }, [auth]);

  return <JotaiProvider>{children}</JotaiProvider>;
}
