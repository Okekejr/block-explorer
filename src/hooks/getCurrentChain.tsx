import { useChainId, useChains } from "wagmi";

export const useCurrentChain = () => {
  const chains = useChains();
  const chainId = useChainId();
  const currentChain = chains.filter((chain) => chain.id === chainId);

  return { chainId, chains, currentChain };
};
