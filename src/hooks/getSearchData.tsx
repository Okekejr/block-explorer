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
  getTransactionCount,
  readContract,
} from "wagmi/actions";

export const useSearch = () => {
  const [blockInfo, setBlockInfo] = useState<GetBlockReturnType | null>();
  const [transactInfo, setTransactInfo] =
    useState<GetTransactionReturnType | null>();
  const [balance, setBalance] = useState<GetBalanceReturnType | null>();
  const [transCount, setTransCount] = useState<number | null>();
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

      const transactionCount = await getTransactionCount(wagmiConfig, {
        address: address,
      });

      setTransCount(transactionCount);
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

  const getTokenInfo = useCallback(async (addie: Address) => {
    setLoading(true);
    setError(null);

    try {
      const [name, symbol, totalSupply] = await Promise.all([
        readContract(wagmiConfig, {
          functionName: "name",
          abi: [
            "function name() view returns (string)",
            "function symbol() view returns (string)",
            "function totalSupply() view returns (uint256)",
          ],
          address: addie,
        }),
        readContract(wagmiConfig, {
          functionName: "symbol",
          abi: [
            "function name() view returns (string)",
            "function symbol() view returns (string)",
            "function totalSupply() view returns (uint256)",
          ],
          address: addie,
        }),
        readContract(wagmiConfig, {
          functionName: "totalSupply",
          abi: [
            "function name() view returns (string)",
            "function symbol() view returns (string)",
            "function totalSupply() view returns (uint256)",
          ],
          address: addie,
        }),
      ]);

      setTokenInfo({ name, symbol, totalSupply });
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

  const handleSearch = useCallback(async () => {
    setLoading(true);
    setError(null);
    setBlockInfo(null);
    setTransactInfo(null);
    setBalance(null);
    setTransCount(null);
    setTokenInfo(null);

    try {
      if (!query) {
        throw new Error("Query is empty");
      }

      // Check if the query is a block number
      if (!isNaN(Number(query))) {
        const blockNum = BigInt(query);
        await getBlockInfo(blockNum);
      }
      // Check if the query is a transaction hash
      else if (query.startsWith("0x") && query.length === 66) {
        const txHash = query as Hash;
        await getTransact(txHash);
      }
      // Check if the query is an address
      else if (query.startsWith("0x") && query.length === 42) {
        const address = query as Address;
        await getAddressInfo(address);
        await getTokenInfo(address);
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
  }, [query, getBlockInfo, getTransact, getAddressInfo, getTokenInfo]);

  return { query, blockInfo, loading, handleSearch, setQuery };
};
