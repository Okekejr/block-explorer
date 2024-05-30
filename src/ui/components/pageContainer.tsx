import {
  Container,
  ContainerProps,
  Flex,
  HStack,
  Stack,
  SystemProps,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";

interface Props extends ContainerProps {
  children: React.ReactElement | React.ReactElement[];
  _spacing?: number | string;
}

interface PropsStack {
  children: React.ReactNode;
}

export const PageContainer: React.FC<Props> = ({
  children,
  _spacing = 8,
  ...rest
}) => {
  return (
    <Container
      display="flex"
      flexDir="column"
      gap={_spacing}
      justifyContent="center"
      maxW="container.xl"
      w="100%"
      position="relative"
      px={{ base: 6, lg: 24 }}
      pt={{ base: 6, md: 16 }}
      pb={{ sm: 8, md: 24 }}
      zIndex={10}
      {...rest}
    >
      {children}
    </Container>
  );
};

export const StackItemContainer = ({ children }: PropsStack) => {
  return <Stack spacing="5px">{children}</Stack>;
};

export const MarketInfoCard: FC<Props> = ({ children, ...rest }) => {
  return (
    <>
      <Flex
        bg="#151515"
        border="1px solid"
        borderColor="#222"
        borderRadius="1.25rem"
        boxShadow="0 0.5rem 1.2rem rgba(82, 85, 92, .15);"
        padding={6}
        maxW="container.xl"
        position="relative"
     
        w="100%"
        {...rest}
      >
        <HStack>{children}</HStack>
      </Flex>
    </>
  );
};
