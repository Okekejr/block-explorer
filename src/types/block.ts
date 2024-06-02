import { FlexProps } from "@chakra-ui/react";
import { Chain } from "viem";
import { UseBlockReturnType } from "wagmi";

export interface BlockContT extends FlexProps {
  currentChain: Chain[];
  timeStamp?: bigint | undefined;
  block?: bigint | undefined | null;
  miner?: string | undefined;
  gasUsed?: bigint | undefined;
  icon?: React.ReactElement;
  title: string;
}

export interface BlockTransT {
  data: UseBlockReturnType["data"] | null | undefined;
  currentChain: Chain[];
}

export interface BlockInfoT {
  data: UseBlockReturnType["data"] | undefined | null;
  isLoading: boolean;
  currentChain: Chain[];
}
