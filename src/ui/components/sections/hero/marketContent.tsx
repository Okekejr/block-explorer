import {
  Center,
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  Stack,
} from "@chakra-ui/react";
import { FaChartPie } from "react-icons/fa";
import { HiCubeTransparent } from "react-icons/hi";
import { TbWorld } from "react-icons/tb";
import { MarketInfo } from "./marketInfo";
import { InfoCard } from "../../pageContainer";
import { FC } from "react";
import { formattedAmount, formattedNum, networkImage } from "@/utils";
import { PageChart } from "@/ui/core/chartComp";
import { MarketContT } from "@/types";

export const MarketContent: FC<MarketContT> = ({
  marketData,
  btnPrice,
  currentChain,
  chartData,
  loading,
}) => {
  return (
    <>
      <InfoCard>
        <Stack direction={{ base: "column", md: "row" }} spacing={8}>
          <Flex flexDirection="column" gap={6}>
            <MarketInfo
              title={`${currentChain[0].name} PRICE`}
              icon={networkImage(currentChain[0].name)}
              amount={
                marketData && formattedAmount(marketData[0].current_price)
              }
              loading={loading}
              btnAmount={btnPrice && btnPrice[0].current_price}
            />

            <Divider orientation="horizontal" />

            <MarketInfo
              title="MARKET CAP"
              icon={<FaChartPie size="1.3rem" />}
              amount={marketData && formattedAmount(marketData[0].market_cap)}
              loading={loading}
            />
          </Flex>

          <Center
            display={{ base: "none", md: "block" }}
            height="140px"
            px="6px"
          >
            <Divider orientation="vertical" />
          </Center>

          <Divider
            display={{ base: "block", md: "none" }}
            orientation="horizontal"
          />

          <Flex flexDirection="column" gap={6}>
            <MarketInfo
              title="TOTAL SUPPLY"
              icon={<HiCubeTransparent size="1.3rem" />}
              amount={marketData && formattedNum(marketData[0].total_supply)}
              loading={loading}
            />

            <Divider orientation="horizontal" />

            <MarketInfo
              title="TOTAL VOLUME"
              icon={<TbWorld size="1.3rem" />}
              amount={marketData && formattedNum(marketData[0].total_volume)}
              loading={loading}
            />
          </Flex>

          <Center
            display={{ base: "none", md: "block" }}
            height="140px"
            px="6px"
          >
            <Divider orientation="vertical" />
          </Center>

          <Divider
            display={{ base: "block", md: "none" }}
            orientation="horizontal"
          />

          {loading ? (
            <Flex
              flexDir="column"
              gap={4}
              width={{ base: "100%", md: "20rem" }}
            >
              <SkeletonCircle size="10" />

              <Flex flexDir="column" gap={4}>
                <Skeleton height="20px" width="100px" />
                <Skeleton height="20px" width="100px" />
              </Flex>
            </Flex>
          ) : (
            <PageChart
              chartName={currentChain[0].name}
              chartTitle="HISTORICAL CHART DATA IN 14 DAYS"
              _width={400}
              data={chartData}
            />
          )}
        </Stack>
      </InfoCard>
    </>
  );
};
