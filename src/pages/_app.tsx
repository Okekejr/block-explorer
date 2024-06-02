import theme from "@/theme";
import { FontFaces } from "@/theme/Fonts";
import { Layout } from "@/ui/components/layout";
import { wagmiConfig } from "@/utils/wagmi";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextSeo } from "next-seo";
import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <NextSeo
            title="Blockchain explorer by Okeke Emmanuel."
            titleTemplate="%s"
            description="Block-explorer for both Ethereum and Polygon."
          />
          <FontFaces />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
