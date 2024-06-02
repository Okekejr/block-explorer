import { Chain } from "viem";
import { GetBalanceReturnType } from "wagmi/actions";

export interface TokenInfoT {
  data: GetBalanceReturnType | null;
  query: string | string[] | undefined;
  currentChain: Chain[];
}
