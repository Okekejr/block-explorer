import { FlexProps } from "@chakra-ui/react";
import { chartData } from "./chartData";
import { Chain } from "viem";

export interface MarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply?: null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: Roi;
  last_updated: string;
}

export interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

export interface MarketContT {
  marketData: MarketData[] | null;
  btnPrice: MarketData[] | null;
  chartData: chartData["prices"] | null;
  currentChain: Chain[];
  loading: boolean;
}

export interface MarketInfoT extends FlexProps {
  icon: React.ReactElement;
  title: string;
  amount: string | number | null;
  loading: boolean;
  btnAmount?: number | null;
}
