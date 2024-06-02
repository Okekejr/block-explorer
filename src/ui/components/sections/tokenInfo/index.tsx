import { Heading, Link, Stack, Text } from "@chakra-ui/react";
import { InfoCard } from "../../pageContainer";
import { FC } from "react";
import { formatEther } from "viem";
import { BlockUrl, getColor } from "@/utils";
import { TokenInfoT } from "@/types";

export const TokenInfo: FC<TokenInfoT> = ({ data, query, currentChain }) => {
  const { id, blockExplorers } = currentChain[0];

  return (
    <>
      <InfoCard flexDirection="column">
        <Stack direction="column" spacing={4}>
          <Heading fontSize={{ base: "1.3rem", md: "x-large" }}>
            Address Information
          </Heading>
          <Text fontSize={{ base: "medium", md: "1.2rem" }}>
            Address:{" "}
            <Link
              href={BlockUrl({
                url: blockExplorers?.default.url,
                addres: query as string,
              })}
              color={getColor({ chainId: id })}
              isExternal
            >
              {query}
            </Link>
          </Text>
          <Text fontSize={{ base: "medium", md: "1.2rem" }}>
            Symbol:{" "}
            <Text as="span" color={getColor({ chainId: id })}>
              {data?.symbol}
            </Text>
          </Text>
          <Text fontSize={{ base: "medium", md: "1.2rem" }}>
            Balance:{" "}
            <Text as="span" color={getColor({ chainId: id })}>
              {data && Number(formatEther(data?.value)).toFixed(4)}{" "}
              {data?.symbol}
            </Text>
          </Text>
        </Stack>
      </InfoCard>
    </>
  );
};
