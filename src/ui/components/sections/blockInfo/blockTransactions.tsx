import { useTransact } from "@/hooks/getTransaction";
import { FC } from "react";
import { Chain } from "viem";
import { UseBlockReturnType } from "wagmi";
import { TransactionCard } from "./transactionCard";
import { Skeleton, Stack } from "@chakra-ui/react";
import { InfoCard } from "../../pageContainer";

interface Props {
  data: UseBlockReturnType["data"];
  currentChain: Chain[];
}

export const BlockTransactions: FC<Props> = ({ data, currentChain }) => {
  const { transItems, loading } = useTransact({ data: data });

  return (
    <>
      <Stack direction="column" gap={8}>
        {loading ? (
          <>
            <InfoCard>
              <Skeleton height="20px" width="200px" />
            </InfoCard>
            <InfoCard>
              <Skeleton height="20px" width="200px" />
            </InfoCard>
            <InfoCard>
              <Skeleton height="20px" width="200px" />
            </InfoCard>
          </>
        ) : (
          transItems.map((item, i) => {
            const { from, to, hash, gas, value } = item;
            return (
              <InfoCard key={i}>
                <TransactionCard
                  currentChain={currentChain}
                  value={value}
                  addie={hash}
                  from={from}
                  data={data}
                  gas={gas}
                  to={to}
                />
              </InfoCard>
            );
          })
        )}
      </Stack>
    </>
  );
};
