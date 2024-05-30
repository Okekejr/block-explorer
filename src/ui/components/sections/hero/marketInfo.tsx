import {
  Flex,
  FlexProps,
  Skeleton,
  SkeletonCircle,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FC } from "react";

interface MarketInfoT extends FlexProps {
  icon: React.ReactElement;
  title: string;
  amount: string | number | null;
  loading: boolean;
  btnAmount?: number | null;
}

export const MarketInfo: FC<MarketInfoT> = ({
  amount,
  btnAmount,
  icon,
  loading = true,
  title,
  ...rest
}) => {
  return (
    <>
      {loading ? (
        <Flex alignItems="center" gap={4} width={{ base: "100%", md: "20rem" }}>
          <SkeletonCircle size="10" />
          <Flex flexDir="column">
            <Skeleton height="20px" width="100px" />
          </Flex>
        </Flex>
      ) : (
        <Flex
          alignItems="center"
          gap={4}
          width={{ base: "100%", md: "20rem" }}
          {...rest}
        >
          <>{icon}</>
          <Flex flexDir="column" gap="2px">
            <Text
              fontSize={{ base: "small", md: "0.8rem" }}
              textTransform="uppercase"
            >
              {title}
            </Text>
            <Flex alignItems="center" gap="5px">
              <Text
                fontSize={{ base: "small", md: "medium" }}
                fontWeight="bold"
              >
                {amount && amount}
              </Text>
              {btnAmount && (
                <Tooltip
                  hasArrow
                  label="View Historical Chart"
                  placement="bottom"
                >
                  <Text color="neutral.200">@ {btnAmount} BTC</Text>
                </Tooltip>
              )}
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};
