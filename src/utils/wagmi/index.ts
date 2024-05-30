import { mainnet, polygon } from "viem/chains";
import { createConfig, http } from "wagmi";

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY_MAINNET}`,
      {
        key: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
        name: "Alchemy HTTP Provider",
      }
    ),
    [polygon.id]: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY_POLYGON}`,
      {
        key: process.env.NEXT_PUBLIC_ALCHEMY_KEY_POLYGON,
        name: "Alchemy HTTP Provider",
      }
    ),
  },
});
