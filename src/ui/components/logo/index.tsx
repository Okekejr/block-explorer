import { Flex, FlexProps, Text } from "@chakra-ui/react";
import { FC } from "react";
import { EthereumIcon, PolygonIcon } from "../icons";

interface Props extends FlexProps {
  chainNum: number;
}

export const Logo: FC<Props> = ({ chainNum, ...rest }) => {
  return (
    <>
      {chainNum === 1 ? (
        <Flex alignItems="center" gap={4} {...rest}>
          <EthereumIcon w={8} />
          <Text fontSize={{ base: "large", md: "1.2rem" }} fontWeight="bold">
            Etherscan
          </Text>
        </Flex>
      ) : (
        <Flex alignItems="center" gap={4} {...rest}>
          <PolygonIcon w={8} />
          <Text fontSize={{ base: "large", md: "1.2rem" }} fontWeight="bold">
            Polygonscan
          </Text>
        </Flex>
      )}
    </>
  );
};
