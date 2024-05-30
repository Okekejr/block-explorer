import { EthereumIcon, PolygonIcon } from "@/ui/components/icons";

export const networkImage = (name: string) => {
  if (name === "Ethereum") {
    return <EthereumIcon />;
  } else {
    return <PolygonIcon />;
  }
};

export const getNetworkID = (networkID: number): string => {
  if (networkID === 1) {
    return "ethereum";
  } else if (networkID === 137) {
    return "matic-network";
  }
  return "ethereum";
};
