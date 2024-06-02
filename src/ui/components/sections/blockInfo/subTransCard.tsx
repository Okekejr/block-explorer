import { BlockUrl, TruncateAddress, getColor } from "@/utils";
import { Flex, Link, Text } from "@chakra-ui/react";
import { FC } from "react";

interface SubTransCardT {
  title: string;
  chainID: number;
  addie: string | undefined | null;
  url: string | undefined;
}

export const SubTransCard: FC<SubTransCardT> = ({
  title,
  chainID,
  addie,
  url,
}) => {
  return (
    <>
      <Flex width="12rem" flexDir="column" gap="8px">
        <Text
          display={{ base: "block", md: "none" }}
          fontSize={{ base: "small", md: "1.2rem" }}
        >
          {title}
        </Text>

        <Text
          fontSize={{ base: "small", md: "1.2rem" }}
          color={getColor({ chainId: chainID })}
        >
          <Link
            href={BlockUrl({
              url: url,
              addres: addie,
            })}
            isExternal
          >
            {addie ? TruncateAddress(4, addie) : ""}
          </Link>
        </Text>
      </Flex>
    </>
  );
};
