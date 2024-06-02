import { getColorT } from "@/types/utilTypes";

export const formattedAmount = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export const formattedNum = (amount: number | bigint | undefined) =>
  new Intl.NumberFormat("en-US").format(Number(amount));

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

export const TimeAndDate = (timestamp: bigint | undefined) => {
  const newDate = new Date(Number(timestamp) * 1000);
  const day = newDate.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return day;
};

export const justSeconds = (timestamp: bigint | undefined) => {
  const newDate = new Date(Number(timestamp) * 1000);
  const sec = newDate.toLocaleString("en-US", {
    second: "numeric",
  });

  return sec;
};

interface BlockUrlT {
  block?: bigint | undefined | null;
  addres?: string | undefined | null;
  url: string | undefined;
}

export const BlockUrl = ({ block, url, addres }: BlockUrlT): string => {
  if (block) {
    return `${url}/block/${block}`;
  } else {
    return `${url}/address/${addres}`;
  }
};

export const GetSearchText = (query: string | string[] | undefined): string => {
  if (Array.isArray(query)) {
    query = query[0]; // Take the first element if it's an array
  }

  if (query === undefined) {
    return "";
  }

  // Check if the query is a transaction hash
  if (query.startsWith("0x") && query.length === 66) {
    return "Tx Hash:";
  }
  // Check if the query is an address
  else if (query.startsWith("0x") && query.length === 42) {
    return "Address:";
  }
  // Check if the query is a block number
  else if (!isNaN(Number(query))) {
    return "Block:";
  }

  return "";
};
