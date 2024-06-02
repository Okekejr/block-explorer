import { wagmiConfig } from "@/utils/wagmi";
import { useCallback, useState } from "react";
import { Address, Hash } from "viem";
import {
  GetBalanceReturnType,
  GetBlockReturnType,
  GetTransactionReturnType,
  ReadContractReturnType,
  getBalance,
  getBlock,
  getTransaction,
} from "wagmi/actions";

export const useSearch = () => {
  const [blockInfo, setBlockInfo] = useState<GetBlockReturnType | null>();
  const [transactInfo, setTransactInfo] =
    useState<GetTransactionReturnType | null>();
  const [balance, setBalance] = useState<GetBalanceReturnType | null>();
  const [query, setQuery] = useState<string | null>(null);
  const [tokenInfo, setTokenInfo] = useState<ReadContractReturnType | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getBlockInfo = useCallback(async (blockNum: bigint | undefined) => {
    setLoading(true);
    setError(null);

    try {
      const fetchingBlock = await getBlock(wagmiConfig, {
        blockNumber: blockNum,
      });

      setBlockInfo(fetchingBlock);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const getTransact = useCallback(async (txHash: any) => {
    setLoading(true);
    setError(null);

    try {
      const fetchingTransaction = await getTransaction(wagmiConfig, {
        hash: txHash,
      });

      setTransactInfo(fetchingTransaction);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const getAddressInfo = useCallback(async (address: Address) => {
    setLoading(true);
    setError(null);

    try {
      const balance = await getBalance(wagmiConfig, {
        address: address,
      });

      setBalance(balance);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(
    async (query: string) => {
      setLoading(true);
      setError(null);
      setBlockInfo(null);
      setTransactInfo(null);
      setBalance(null);
      setTokenInfo(null);

      try {
        if (!query) {
          throw new Error("Query is empty");
        }

        // Check if the query is a transaction hash
        if (query.startsWith("0x") && query.length === 66) {
          const txHash = query as Hash;
          await getTransact(txHash);
        }

        // Check if the query is an address transaction hash
        else if (query.startsWith("0x") && query.length === 42) {
          const address = query as Address;
          await getAddressInfo(address);
        }

        // Check if the query is an block number
        else if (!isNaN(Number(query))) {
          const blockNum = BigInt(query);
          await getBlockInfo(blockNum);
        } else {
          throw new Error("Invalid query format");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    [getBlockInfo, getTransact, getAddressInfo]
  );

  return {
    query,
    blockInfo,
    transactInfo,
    balance,
    loading,
    tokenInfo,
    handleSearch,
    setQuery,
  };
};
