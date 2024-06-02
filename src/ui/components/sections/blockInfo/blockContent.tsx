import {
  BlockUrl,
  TimeAndDate,
  TruncateAddress,
  formattedNum,
  getColor,
} from "@/utils";
import { Flex, FlexProps, Link, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { Chain } from "viem";

interface BlockContT extends FlexProps {
  currentChain: Chain[];
  timeStamp?: bigint | undefined;
  block?: bigint | undefined;
  miner?: string | undefined;
  gasUsed?: bigint | undefined;
  icon?: React.ReactElement;
  title: string;
}

export const BlockContent: FC<BlockContT> = ({
  icon,
  title,
  block,
  miner,
  gasUsed,
  timeStamp,
  currentChain,
  ...rest
}) => {
  const { id, blockExplorers } = currentChain[0];

  return (
    <>
      <Flex justifyContent="space-between" {...rest}>
        <Flex alignItems="center" gap="8px">
          {icon}
          <Text fontSize={{ base: "small", md: "1.2rem" }}>
            {title}{" "}
            <Text as="span" color={getColor({ chainId: id })}>
              {gasUsed ? (
                formattedNum(gasUsed)
              ) : (
                <Link
                  href={BlockUrl({
                    url: blockExplorers?.default.url,
                    block: block,
                    addres: miner,
                  })}
                  isExternal
                >
                  {block
                    ? Number(block)
                    : miner
                    ? TruncateAddress(4, miner)
                    : ""}
                </Link>
              )}
            </Text>
          </Text>
        </Flex>
        {timeStamp && (
          <Text fontSize={{ base: "small", md: "1.2rem" }}>
            {TimeAndDate(timeStamp)}
          </Text>
        )}
      </Flex>
    </>
  );
};
