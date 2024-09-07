"use client";
import useWeb3auth from "@/hooks/useWeb3auth";
import { GRAPHQL_ENDPOINT } from "@/utils/constants";
import { Provider as JotaiProvider } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";

// create client instance for GraphQL
const client = new Client({
  url: GRAPHQL_ENDPOINT,
  exchanges: [cacheExchange, fetchExchange],
});

/**
 * Providers component
 * @param param0
 * @returns
 */
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

  return (
    <JotaiProvider>
      <Provider value={client}>{children}</Provider>
    </JotaiProvider>
  );
}
