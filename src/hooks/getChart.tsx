import { chartData } from "@/types/chartData";
import { getNetworkID } from "@/utils";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Props {
  chainNum: number;
  timePeriod: string;
}

export const useGetChart = ({ chainNum, timePeriod }: Props) => {
  const [chartData, setChartData] = useState<chartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const url = useMemo(() => {
    return ` https://api.coingecko.com/api/v3/coins/${getNetworkID(
      chainNum
    )}/market_chart?vs_currency=usd&days=${timePeriod}`;
  }, [chainNum, timePeriod]);

  const fetchChartData = useCallback(async () => {
    // setLoading(true);
    // setError(null);
    // try {
    //   const response = await fetch(url, {
    //     method: "GET",
    //     headers: {
    //       accept: "application/json",
    //       "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_KEY || "",
    //     },
    //   });
    //   if (!response.ok) {
    //     throw new Error(`Error: ${response.statusText}`);
    //   }
    //   const parsing = await response.json();
    //   setChartData(parsing);
    // } catch (error: unknown) {
    //   if (error instanceof Error) {
    //     setError(error.message);
    //   } else {
    //     setError("An unknown error occurred");
    //   }
    // } finally {
    //   setLoading(false);
    // }
  }, [url]);

  useEffect(() => {
    if (chainNum) {
      fetchChartData();
    }
  }, [chainNum, fetchChartData]);

  return { chartData, loading, error };
};
