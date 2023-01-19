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
import $anime from "../services/anime";
import { useEffect, useState, useMemo, useRef, ChangeEvent } from "react";
import Header from "../components/Header";
import AnimeCards from "../components/AnimeCards";
import AnimeDrawer from "../components/AnimeDrawer";
import Anime from "../types/anime";
import Genre from "../types/genres";
import { Search2Icon } from "@chakra-ui/icons";
import { IoFilter } from "react-icons/io5";
import FilterContent from "../components/FilterContent";

export default function Home() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [searchAnime, setSearchAnime] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const scrollRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState();

  const lowerPage = useMemo(() => {
    if (totalPages === 0) {
      return 0;
    }
    if (totalPages < 6) {
      return 1;
    }
    if (currentPage === totalPages) {
      return currentPage - 5;
    }
    if (currentPage + 4 >= totalPages) {
      return totalPages - 4;
    }
    return currentPage - 1;
  }, [totalPages, currentPage]);
  const upperPage = useMemo(() => {
    if (totalPages === 0) {
      return 0;
    }
    if (totalPages < 6) {
      return totalPages;
    }
    if (currentPage === totalPages || currentPage + 4 >= totalPages) {
      return totalPages;
    }
    return currentPage + 4;
  }, [totalPages, currentPage]);
  const pageRange = useMemo(() => {
    if (upperPage === 0) {
      return [];
    }
    if (upperPage < 6) {
      return Array.from(Array(upperPage).keys()).map((index) => index + 1);
    }
    return Array.from(Array(5).keys()).map((index) => index + lowerPage);
  }, [lowerPage, upperPage]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onOpenDrawer = (item: Anime) => {
    onOpen();
    console.log(item);
    setSelectedAnime(item);
  };

  const getAnimes = async (page: number, searchAnime: string, sfw: boolean) => {
    const data = await $anime.getAnimes(page, searchAnime, sfw);
    setAnimeList(data.data);
    setTotalPages(data.pagination.last_visible_page);
    setCurrentPage(page);
    if (scrollRef?.current?.offsetTop) {
      window.scrollTo({ behavior: "smooth", top: scrollRef.current.offsetTop });
    }
    console.log(data);
  };
  const getAnimeGenres = async () => {
    const data = await $anime.getAnimeGenres();
    setGenres(data.data);
    console.log(data.data);
  };

  const onPreviousPage = () => {
    const page = currentPage - 1;
    getAnimes(page);
    setCurrentPage(page);
  };

  const onNextPage = () => {
    const page = currentPage + 1;
    getAnimes(page, searchAnime, true);
    setCurrentPage(page);
  };

  const debounceRef = useRef<NodeJS.Timeout>();

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("aqui");
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setSearchAnime(e.target.value);
    }, 1000);
  };
  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  // useEffect(() => {
  //   getAnimes(currentPage, searchAnime, true);
  // }, [currentPage, searchAnime]);

  useEffect(() => {
    getAnimeGenres();
  }, []);

  return (
    <>
      <Header title={"MyAnimeList API Simple Client"} />
      <Container
        maxW="container.xl"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="1rem"
        pb="5rem"
        mt="1.5rem"
      >
        <Flex minW={{ base: "auto", md: "700px" }} gap="3">
          <InputGroup>
            <InputRightElement pointerEvents="none" color="#4e42d4">
              <Search2Icon />
            </InputRightElement>
            <Input
              ref={scrollRef}
              borderColor="#4e42d4"
              focusBorderColor="#4e42d4"
              type="text"
              placeholder="Type anime name"
              _placeholder={{ color: "gray" }}
              onChange={(e) => onChangeSearch(e)}
            />
          </InputGroup>
          <FilterContent
            genres={genres}
            btnTigger={
              <IconButton aria-label="Filter database" icon={<IoFilter />} />
            }
          />
        </Flex>
        <AnimeCards items={animeList} onOpenDrawer={onOpenDrawer} />
        {selectedAnime && (
          <AnimeDrawer isOpen={isOpen} onClose={onClose} item={selectedAnime} />
        )}
        <ButtonGroup variant="solid" display="flex" mt="1.5rem">
          <Button
            onClick={onPreviousPage}
            maxH="32px"
            width={{ base: "30px", md: "55px" }}
            bg="#E5E5E5"
          >
            ‹‹
          </Button>
          {pageRange.map((page, i) => (
            <Button
              key={i}
              size="sm"
              minW={{ base: "40px", md: "78px" }}
              onClick={() => onChangePage(page)}
              borderColor="#4e42d4"
              bg={currentPage === page ? "#4e42d4" : "#DCDCDC"}
              color={currentPage === page ? "#FFFFFF" : "#696969"}

              // disabled={page <= 1 && true}
            >
              {page}
            </Button>
          ))}
          <Button
            onClick={onNextPage}
            maxH="32px"
            width={{ base: "30px", md: "55px" }}
            bg="#E5E5E5"
          >
            ››
          </Button>
        </ButtonGroup>
      </Container>
    </>
  );
}
