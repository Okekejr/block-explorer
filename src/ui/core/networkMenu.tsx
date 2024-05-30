import {
  Button,
  Circle,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ChevronUp } from "../components/icons/ChevronUp";
import { useSwitchChain } from "wagmi";
import { fonts } from "@/theme/Fonts";
import { FC } from "react";
import { getColor, networkImage } from "@/utils";
import { useCurrentChain } from "@/hooks/getCurrentChain";

export const NetworkMenu: FC<MenuButtonProps> = ({ ...rest }) => {
  const { chainId, chains, currentChain } = useCurrentChain();
  const { switchChain } = useSwitchChain();

  return (
    <Flex as="nav" alignItems="center">
      <Menu placement="bottom-end" autoSelect={false}>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              background="transparent"
              padding={0}
              height="1.7rem"
              rightIcon={
                <ChevronUp
                  transition="all 175ms ease"
                  transform={isOpen ? "" : "scaleY(-1)"}
                />
              }
              _hover={{ bg: "transparent" }}
              _active={{ bg: "none" }}
              _expanded={{ bg: "transparent" }}
              {...rest}
            >
              {chains
                ? networkImage(currentChain[0].name)
                : networkImage("Ethereum")}
            </MenuButton>

            <MenuList
              background="#0a0a0a"
              borderColor={getColor({ chainId: chainId })}
              borderRadius="12px"
              px="5px"
            >
              {chains.map((network) => {
                return (
                  <MenuItem
                    color="neutral.300"
                    background="transparent"
                    key={network.id}
                    fontFamily={fonts.body}
                    fontWeight="600"
                    fontSize="1rem"
                    borderRadius="12px"
                    mb="8px"
                    _hover={{ bg: "surface.secondary" }}
                    onClick={() => switchChain({ chainId: network.id })}
                  >
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      w="100%"
                    >
                      <HStack gap="10px">
                        {networkImage(network.name)}

                        <Text>{network.name}</Text>
                      </HStack>

                      {network === currentChain[0] && (
                        <Circle
                          size="7px"
                          bg={getColor({ chainId: chainId })}
                        />
                      )}
                    </Flex>
                  </MenuItem>
                );
              })}
            </MenuList>
          </>
        )}
      </Menu>
    </Flex>
  );
};
