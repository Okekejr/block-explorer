import { useCurrentChain } from "@/hooks/getCurrentChain";
import { useSearch } from "@/hooks/getSearchData";
import { getColor } from "@/utils";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";

export const SearchBar = () => {
  const { query, loading, blockInfo, handleSearch, setQuery } = useSearch();

  const { chainId } = useCurrentChain();

  console.log(blockInfo);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearch();
    setQuery(null);
  };

  const onChangehandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const info = event.currentTarget.value;
    setQuery(info);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <FormControl isRequired>
          <InputGroup
            borderColor={getColor({ chainId: chainId })}
            w={{ base: "", md: "22rem", lg: "35rem" }}
          >
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search by Address/ Txn Hash/ Block Number/ Token Address"
              _placeholder={{ color: "gray.400" }}
              value={query || ""}
              onChange={onChangehandler}
            />
            <InputRightElement display={{ base: "none", lg: "flex" }}>
              {loading && (
                <Flex
                  pos="absolute"
                  top="0"
                  right="0"
                  alignItems="center"
                  h="full"
                  mr="2"
                >
                  <Spinner
                    size="sm"
                    color="blue.600"
                    speed="0.65s"
                    thickness="4px"
                    emptyColor="gray.200"
                  />
                </Flex>
              )}
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>
    </>
  );
};
