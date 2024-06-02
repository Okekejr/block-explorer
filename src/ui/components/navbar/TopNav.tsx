import { CurrentPrice } from "@/ui/core/currentPrice";
import { MySocials } from "@/ui/core/socialsList";
import { Flex } from "@chakra-ui/react";
import { FC } from "react";

export const TopNav: FC = () => {
  return (
    <>
      <Flex
        px={{ base: 6, lg: 8 }}
        zIndex="sticky"
        width="100%"
        justifyContent="space-between"
        height="5vh"
        borderBottom="1px solid"
        borderColor="#222"
        bg="#111"
        gap={4}
      >
        <CurrentPrice />
        <MySocials />
      </Flex>
    </>
  );
};
