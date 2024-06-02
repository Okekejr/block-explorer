import { FC } from "react";
import { ContainerProps, Flex, useDisclosure } from "@chakra-ui/react";
import { useChainId } from "wagmi";
import { NavLinks } from "./NavLinks";
import { MobileToggle } from "./MobileToggle";
import { MobileDrawer } from "./MobileDrawer";
import { useMounted } from "@/hooks/useMounted";
import { Logo } from "../logo";
import { NetworkMenu } from "@/ui/core/networkMenu";
import { Link } from "@chakra-ui/next-js";
import { TopNav } from "./TopNav";

interface Props extends ContainerProps {
  isShrunk: boolean;
}

export const Navbar: FC<Props> = ({ isShrunk, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasMounted } = useMounted();
  const chainId = useChainId();

  return hasMounted ? (
    <Flex zIndex="sticky" flexDirection="column" position="fixed" width="100%">
      <TopNav />
      <Flex
        py={{ base: 3, md: 2 }}
        zIndex="sticky"
        left="0"
        top="0"
        w="100%"
        justify="center"
        bg="#111"
        borderBottom="1px solid"
        borderColor="#222"
        {...rest}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          maxW="container.xl"
          w="100%"
          px={{ base: 6, lg: 8 }}
          zIndex={1}
        >
          <Flex flex="1 1" justifyContent="flex-start">
            <Link
              aria-label="block-explorer-logo"
              href="/"
              _hover={{ textDecor: "none" }}
            >
              <Logo chainNum={chainId} h="38px" />
            </Link>
          </Flex>

          <NavLinks
            onClose={onClose}
            display={{ base: "none", lg: "flex" }}
            background={isShrunk ? "" : "background.100"}
            backdropFilter={isShrunk ? "" : "blur(5px)"}
            borderRadius="1.25rem"
            height="2.5rem"
            padding="0 1.5rem"
            gap={{ base: "1.2rem", md: "1rem", lg: "0.5rem" }}
          />

          <Flex justifyContent="flex-end" flex="1 1">
            <NetworkMenu />
          </Flex>

          <MobileToggle
            isOpen={isOpen}
            onClick={onOpen}
            marginInlineStart={{ base: "1rem" }}
            mr={-4}
          />

          <MobileDrawer isOpen={isOpen} onClose={onClose} />
        </Flex>
      </Flex>
    </Flex>
  ) : null;
};
