import { Box, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { PageContainer } from "../../pageContainer";
import { MarketContent } from "./marketContent";
import { useMarketData } from "@/hooks/getMarketData";
import { useCurrentChain } from "@/hooks/getCurrentChain";
import { useGetChart } from "@/hooks/getChart";
import { BlockInfo } from "../blockInfo";
import { useBlock } from "wagmi";
import { SearchBar } from "@/ui/core/searchBar";

export const Hero: FC = () => {
  const { chainId, currentChain } = useCurrentChain();

  const { chartData } = useGetChart({
    chainNum: chainId,
    timePeriod: "14",
  });

  const { marketData, loading } = useMarketData({
    chainNum: chainId,
    currency: "usd",
  });

  const { marketData: btnPrice } = useMarketData({
    chainNum: chainId,
    currency: "btc",
  });

  const { data, isLoading } = useBlock({ chainId: chainId });

  return (
    <>
      <Box
        width="100%"
        height="30vh"
        backgroundImage="/assets/bgImg.png"
        bgSize="cover"
        bgRepeat="no-repeat"
      >
        <picture>
          <source srcSet="assets/bgImg.webp" type="image/webp" />
          <source srcSet="assets/bgImg.png" type="image/png" />
        </picture>

        <PageContainer _spacing={8}>
          <Heading fontSize={{ base: "1.3rem", md: "x-large" }}>
            {currentChain ? currentChain[0].name : ""} Chain Explorer
          </Heading>

          <SearchBar />

          <MarketContent
            currentChain={currentChain}
            btnPrice={btnPrice}
            marketData={marketData}
            chartData={chartData?.prices}
            loading={loading}
          />

          <BlockInfo
            data={data}
            isLoading={isLoading}
            currentChain={currentChain}
          />
        </PageContainer>
      </Box>
    </>
  );
};
