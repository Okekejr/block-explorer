import { FC } from "react";
import { Flex, FlexProps, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Link } from "@chakra-ui/next-js";
import { routes } from "@/utils/routes";
import { useChainId } from "wagmi";
import { getColor } from "@/utils";

interface NavLinksProps extends FlexProps {
  onClose: () => void;
}

export const NavLinks: FC<NavLinksProps> = ({ onClose, ...rest }) => {
  const { pathname } = useRouter();
  const chainId = useChainId();

  return (
    <Flex
      as="nav"
      alignItems="center"
      borderBottom="1px solid"
      borderColor={getColor({ chainId: chainId })}
      {...rest}
    >
      <HStack spacing={4}>
        {routes.map((rout) => {
          return (
            <Link
              _hover={{
                textDecoration: "none",
              }}
              color={getColor({
                pathname: pathname,
                route: rout,
                chainId: chainId,
              })}
              href={rout.url}
              fontWeight="600"
              key={rout.title}
              isExternal={rout.isExternal}
            >
              {rout.title}
            </Link>
          );
        })}
      </HStack>
    </Flex>
  );
};
