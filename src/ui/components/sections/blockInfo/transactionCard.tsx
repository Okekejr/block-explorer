import { BlockUrl, TruncateAddress, getColor } from "@/utils";
import { Box, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { GiGasPump } from "react-icons/gi";
import { TbReceipt } from "react-icons/tb";
import { formatEther, formatGwei } from "viem";
import { SubTransCard } from "./subTransCard";
import { BlockContent } from "./blockContent";
import { TransactCardT } from "@/types";

export const TransactionCard: FC<TransactCardT> = ({
  currentChain,
  addie,
  gas,
  from,
  to,
  value,
  data,
  ...rest
}) => {
  const { id, blockExplorers } = currentChain[0];

  return (
    <>
      <Stack
        direction={{ base: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        {...rest}
      >
        <Flex
          alignItems={{ lg: "center" }}
          justifyContent="space-between"
          direction={{ base: "column", md: "row" }}
          width={{ base: "100%", md: "auto" }}
          gap={8}
        >
          <Flex alignItems="center" gap={4}>
            <Box
              backgroundColor="#222"
              borderRadius="12px"
              padding="8px"
              display={{ base: "none", md: "block" }}
            >
              <TbReceipt size="1.2rem" />
            </Box>
            <Flex
              gap="5px"
              width={{ md: "12rem" }}
              flexDirection={{ base: "row", md: "column" }}
            >
              <Text
                display={{ base: "block", md: "none" }}
                fontSize={{ base: "medium", md: "1.2rem" }}
              >
                TX#
              </Text>
              <Text
                fontSize={{ base: "medium", md: "1.2rem" }}
                color={getColor({ chainId: id })}
              >
                <Link
                  href={BlockUrl({
                    url: blockExplorers?.default.url,
                    addres: addie,
                  })}
                  isExternal
                >
                  {addie ? TruncateAddress(4, addie) : ""}
                </Link>
              </Text>

              {gas && (
                <Flex
                  display={{ base: "none", md: "flex" }}
                  alignItems="center"
                  gap="8px"
                >
                  <GiGasPump />
                  <Text>{formatGwei(gas)}</Text>
                </Flex>
              )}
            </Flex>
          </Flex>
          <Flex gap="5px" flexDirection="column" alignContent="center">
            <SubTransCard
              title="From"
              addie={from}
              url={blockExplorers?.default.url}
              chainID={id}
            />

            <SubTransCard
              title="To"
              addie={to}
              url={blockExplorers?.default.url}
              chainID={id}
            />
          </Flex>

          <BlockContent
            title="Block No:"
            block={data}
            currentChain={currentChain}
          />

          <Box
            padding="2px"
            px="5px"
            bgColor="#222"
            borderRadius="12px"
            width="fit-content"
            display={{ base: "block", md: "none" }}
          >
            {currentChain[0].id === 1 && `${value && formatEther(value)} Eth`}

            {currentChain[0].id === 137 &&
              `${value && formatEther(value)} MATIC`}
          </Box>
        </Flex>

        <Box
          padding="2px"
          px="5px"
          bgColor="#222"
          borderRadius="12px"
          width="fit-content"
          display={{ base: "none", md: "block" }}
        >
          {currentChain[0].id === 1 && `${value && formatEther(value)} Eth`}

          {currentChain[0].id === 137 && `${value && formatEther(value)} MATIC`}
        </Box>
      </Stack>
    </>
  );
};
