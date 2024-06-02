import { useCurrentChain } from "@/hooks/getCurrentChain";
import { useMarketData } from "@/hooks/getMarketData";
import { formattedAmount, getColor } from "@/utils";
import { Flex, HStack, Skeleton, Text } from "@chakra-ui/react";

export const CurrentPrice = () => {
  const { chainId, currentChain } = useCurrentChain();

  const { marketData, error, loading } = useMarketData({
    chainNum: chainId,
    currency: "usd",
  });

  return (
    <>
      <HStack>
        {loading ? (
          <Skeleton height="20px" width="100px" />
        ) : (
          <>
            {currentChain && marketData ? (
              <Flex gap="5px">
                <Text fontSize={{ base: "small", md: "medium" }}>
                  {currentChain[0].name} Price:
                </Text>{" "}
                <Text
                  fontSize={{ base: "small", md: "medium" }}
                  color={getColor({ chainId: chainId })}
                >
                  {formattedAmount(marketData[0].current_price)}
                </Text>
              </Flex>
            ) : (
              <Text>{error}</Text>
            )}
          </>
        )}
      </HStack>
    </>
  );
};
