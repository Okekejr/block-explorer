import { StackProps } from "@chakra-ui/react";
import { Chain } from "viem";

export interface SubTransCardT {
  title: string;
  chainID: number;
  addie: string | undefined | null;
  url: string | undefined;
}

export interface TransactCardT extends StackProps {
  currentChain: Chain[];
  addie: string | undefined;
  gas: bigint | undefined;
  from: string | undefined;
  to: string | null | undefined;
  value: bigint | undefined;
  data?: bigint | null | undefined;
}
