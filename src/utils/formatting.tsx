import { getColorT } from "@/types/utilTypes";

export const formattedAmount = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export const formattedNum = (amount: number) =>
  new Intl.NumberFormat("en-US").format(amount);

export const getColor = ({ pathname, route, chainId }: getColorT) => {
  if (pathname === route?.url) {
    if (chainId === 1) {
      return "primary.ether";
    } else if (chainId === 137) {
      return "primary.base";
    }
  }

  return "neutral.100";
};
