import {
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Switch,
  Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import Genre from "../types/genre";

export interface FilterContentProps {
  btnTigger: ReactNode;
  genres: Genre[];
  selectedGenres: string[];
  onSelectGenre: (mal_id: string) => void;
  onFilterSearch: () => void;
  onCleanFilter: () => void;
  onChangeSwitch: (checked: boolean) => void;
  NSFW: boolean;
  isOpen: boolean;
  skeleton: boolean;
}

const FilterContent = ({
  btnTigger,
  genres,
  onSelectGenre,
  onFilterSearch,
  selectedGenres,
  onCleanFilter,
  onChangeSwitch,
  NSFW,
  skeleton,
  isOpen,
}: FilterContentProps) => {
  return (
    <Popover closeOnBlur={true} isOpen={isOpen}>
      <PopoverTrigger>{btnTigger}</PopoverTrigger>
      <PopoverContent minW="370px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Filters</PopoverHeader>
        <PopoverBody overflowY="auto" height="300px">
          <HStack minH="42px">
            <Text minW="60px">NSFW</Text>
            <Switch
              disabled={skeleton}
              size="md"
              colorScheme="gray"
              isChecked={!NSFW}
              onChange={(e) => onChangeSwitch(!!e.target.value)}
            />
          </HStack>
          <Divider height="10px" />
          <HStack
            minH="42px"
            mt="0.5rem"
            display="flex"
            alignItems="flex-start"
          >
            <Text minW="60px">Genres</Text>
            <SimpleGrid columns={2} minW="200px">
              {genres?.map((genre: Genre, i) => (
                <Checkbox
                  disabled={skeleton}
                  key={i}
                  size="sm"
                  colorScheme="gray"
                  minH="40px"
                  value={genre.mal_id}
                  isChecked={selectedGenres.includes(genre.mal_id.toString())}
                  onChange={(e) => onSelectGenre(e.target.value)}
                >
                  {genre.name}
                </Checkbox>
              ))}
            </SimpleGrid>
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
          <Button
            size="sm"
            mt="5px"
            minW="67px"
            onClick={() => onCleanFilter()}
            disabled={skeleton}
          >
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
            onClick={() => {
              onFilterSearch();
            }}
            disabled={skeleton}
          >
            Search
          </Button>
        </ButtonGroup>
      </PopoverContent>
    </Popover>
  );
};

export default FilterContent;
