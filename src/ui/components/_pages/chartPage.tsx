import { PageContainer } from "../pageContainer";
import { Divider, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { PageChart } from "@/ui/core/chartComp";
import { useCurrentChain } from "@/hooks/getCurrentChain";
import { useGetChart } from "@/hooks/getChart";

const ChartPage = () => {
  const { chainId, currentChain } = useCurrentChain();

  const { chartData } = useGetChart({
    chainNum: chainId,
    timePeriod: "183",
  });

  return (
    <PageContainer>
      <Heading>
        {`${currentChain ? currentChain[0].name : ""}`} Daily Price (USD) Chart
      </Heading>

      <Divider orientation="horizontal" />

      <Flex
        flexDirection={{ base: "column-reverse", md: "row" }}
        justifyContent="space-between"
        gap={{ base: 8, md: 0 }}
      >
        <PageChart
          chartName={currentChain ? currentChain[0].name : ""}
          chartTitle="HISTORICAL CHART DATA OF 6 MONTHS"
          subTitle="Source Coingecko API"
          _height={500}
          _width={930}
          data={chartData?.prices}
        />
        <Stack width={{ base: "", md: "19rem" }} direction="column">
          <Heading fontSize="1.2rem">About</Heading>
          <Text>
            {`The ${
              currentChain ? currentChain[0].name : ""
            } Daily Price (USD) Chart shows the
            daily historical price for ${
              currentChain ? currentChain[0].name : ""
            } in USD.`}
          </Text>
        </Stack>
      </Flex>
    </PageContainer>
  );
};

export default ChartPage;
