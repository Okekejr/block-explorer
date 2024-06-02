import { wagmiConfig } from "@/utils/wagmi";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GetTransactionReturnType } from "viem";
import { UseBlockReturnType } from "wagmi";
import { getTransaction } from "wagmi/actions";

interface Props {
  data: UseBlockReturnType["data"] | null | undefined;
}

export const useTransact = ({ data }: Props) => {
  const transactions = useMemo(() => data?.transactions.slice(0, 5), [data]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transItems, setTransItems] = useState<GetTransactionReturnType[]>([]);

  const fetchingTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedItems = await Promise.all(
        transactions?.map(async (transact) => {
          const getTransactionData = await getTransaction(wagmiConfig, {
            hash: transact,
          });
          return getTransactionData;
        }) || []
      );
      setTransItems(fetchedItems);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [transactions]);

  useEffect(() => {
    if (transactions?.length) {
      fetchingTransactions();
    }
  }, [fetchingTransactions, transactions?.length]);

  return { transItems, loading, error };
};
