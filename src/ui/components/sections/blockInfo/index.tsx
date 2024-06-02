import { Divider, Flex, Heading, Skeleton, Stack } from "@chakra-ui/react";
import { InfoCard } from "../../pageContainer";
import { UseBlockReturnType } from "wagmi";
import { FC } from "react";
import { Chain } from "viem";
import { RxCube } from "react-icons/rx";
import { IoIosGitNetwork } from "react-icons/io";
import { GiGasPump } from "react-icons/gi";
import { BlockContent } from "./blockContent";
import { BlockTransactions } from "./blockTransactions";

interface BlockInfoT {
  data: UseBlockReturnType["data"];
  isLoading: boolean;
  currentChain: Chain[];
}

export const BlockInfo: FC<BlockInfoT> = ({
  data,
  isLoading,
  currentChain,
}) => {
  return (
    <>
      <Heading fontSize={{ base: "1.3rem", md: "x-large" }}>
        Block Information
      </Heading>
      <InfoCard flexDirection="column">
        <Stack direction="column" spacing={4}>
          {isLoading ? (
            <Flex flexDir="column">
              <Skeleton height="20px" width="200px" />
            </Flex>
          ) : (
            <BlockContent
              icon={<RxCube size="1.3rem" />}
              title="Block Number:"
              block={data && data.number}
              timeStamp={data?.timestamp}
              currentChain={currentChain}
            />
          )}

          {isLoading ? (
            <Flex flexDir="column">
              <Skeleton height="20px" width="200px" />
            </Flex>
          ) : (
            <BlockContent
              icon={<IoIosGitNetwork size="1.3rem" />}
              title="Miner:"
              miner={data?.miner}
              currentChain={currentChain}
            />
          )}

          {isLoading ? (
            <Flex flexDir="column">
              <Skeleton height="20px" width="200px" />
            </Flex>
          ) : (
            <BlockContent
              icon={<GiGasPump size="1.3rem" />}
              title="Gas Used:"
              gasUsed={data?.gasUsed}
              currentChain={currentChain}
            />
          )}

          <Divider orientation="horizontal" />

          <BlockTransactions data={data} currentChain={currentChain} />
        </Stack>
      </InfoCard>
    </>
  );
};
