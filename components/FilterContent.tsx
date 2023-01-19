import {
  Container,
  Flex,
  useDisclosure,
  InputGroup,
  InputRightElement,
  Input,
  IconButton,
  ButtonGroup,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  HStack,
  VStack,
  Switch,
  Text,
  Divider,
  Checkbox,
  SimpleGrid,
  Stack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import Genre from "../types/genres";

export interface FilterContentProps {
  btnTigger: HTMLButtonElement;
  genres: Genre;
}

const FilterContent = ({ btnTigger, genres }: FilterContentProps) => {
  return (
    <Popover>
      <PopoverTrigger>{btnTigger}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Filters</PopoverHeader>
        <PopoverBody overflowY="auto" height="300px">
          <HStack minH="42px" display="flex" alignItems="flex-start">
            <Text minW="60px">Genres</Text>
            <SimpleGrid columns={2} minW="200px">
              {genres?.map((genre: string, i) => (
                <Checkbox key={i} size="sm" colorScheme="red" minH="40px">
                  {genre.name}
                </Checkbox>
              ))}
            </SimpleGrid>
          </HStack>
          <Divider height="10px" />
          <HStack minH="42px">
            <Text minW="60px">NSFW</Text>
            <Switch size="md" />
          </HStack>
        </PopoverBody>
        <Divider height="10px" />
        <ButtonGroup
          width="100%"
          display="flex"
          justifyContent="flex-end"
          height="50px"
          alignItems="center"
        >
          <Button size="sm" mt="5px" minW="67px">
            Clear
          </Button>
          <Button
            size="sm"
            mt="5px"
            bg="#4e42d4"
            color="#FFFFFF"
            _hover={{ bg: "#5e51e8" }}
            minW="67px"
            mr="0.5rem"
          >
            Search
          </Button>
        </ButtonGroup>
      </PopoverContent>
    </Popover>
  );
};

export default FilterContent;
