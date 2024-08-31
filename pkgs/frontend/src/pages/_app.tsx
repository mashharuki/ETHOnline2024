import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Toaster from "@/components/Toaster";

/**
 * App Component
 * @param param0
 * @returns
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <Toaster />
    </ChakraProvider>
  );
}
