import { MarketData } from "@/types/marketData";
import { getNetworkID } from "@/utils";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Props {
  chainNum: number;
  currency: string;
}

export const useMarketData = ({ chainNum, currency }: Props) => {
  const [marketData, setMarketData] = useState<MarketData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const url = useMemo(() => {
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${getNetworkID(
      chainNum
    )}`;
  }, [chainNum, currency]);

  const fetchMarketData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_KEY || "",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const parsing = await response.json();
      setMarketData(parsing);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (chainNum) {
      fetchMarketData();
    }
  }, [chainNum, fetchMarketData]);

  return { marketData, loading, error, url };
};
