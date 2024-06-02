import { Flex, Heading, Skeleton } from "@chakra-ui/react";
import { InfoCard, PageContainer } from "../pageContainer";
import { useRouter } from "next/router";
import { GetSearchText } from "@/utils";
import { useSearch } from "@/hooks/getSearchData";
import { useEffect } from "react";
import { BlockInfo } from "../sections/blockInfo";
import { useCurrentChain } from "@/hooks/getCurrentChain";
import { TransactionCard } from "../sections/blockInfo/transactionCard";
import { TokenInfo } from "../sections/tokenInfo";

const SearchPage = () => {
  const router = useRouter();
  const { query } = router.query;
  const searchText = GetSearchText(query);
  const { currentChain, chainId } = useCurrentChain();
  const { blockInfo, transactInfo, loading, tokenInfo, balance, handleSearch } =
    useSearch();

  useEffect(() => {
    if (query) {
      handleSearch(query as string);
    }
  }, [handleSearch, query, chainId]);

  return (
    <>
      <PageContainer _spacing={8}>
        <>
          {searchText && (
            <Heading fontSize={{ base: "1.2rem", md: "x-large" }}>
              {searchText} {query}
            </Heading>
          )}
        </>

        {loading ? (
          <Flex flexDir="column">
            <Skeleton height="20px" width="200px" />
          </Flex>
        ) : (
          <>
            {blockInfo && (
              <BlockInfo
                data={blockInfo}
                isLoading={loading}
                currentChain={currentChain}
              />
            )}
          </>
        )}

        {loading ? (
          <Flex flexDir="column">
            <Skeleton height="20px" width="200px" />
          </Flex>
        ) : (
          <>
            {transactInfo && (
              <InfoCard>
                <TransactionCard
                  currentChain={currentChain}
                  value={transactInfo?.value}
                  addie={transactInfo?.hash}
                  from={transactInfo?.from}
                  gas={transactInfo?.gas}
                  to={transactInfo?.to}
                  data={transactInfo.blockNumber}
                />
              </InfoCard>
            )}
          </>
        )}

        {loading ? (
          <Flex flexDir="column">
            <Skeleton height="20px" width="200px" />
          </Flex>
        ) : (
          <>
            {balance && (
              <TokenInfo
                data={balance}
                query={query}
                currentChain={currentChain}
              />
            )}
          </>
        )}
      </PageContainer>
    </>
  );
};

export default SearchPage;
