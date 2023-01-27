import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { BsEmojiWink } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";
import AnimeCards from "../components/AnimeCards";
import AnimeDrawer from "../components/AnimeDrawer";
import ErrorAlert from "../components/ErrorAlert";
import FilterContent from "../components/FilterContent";
import Header from "../components/Header";
import usePagination from "../hook/usePagination";
import $anime from "../services/anime";
import Anime from "../types/anime";
import Genre from "../types/genre";

export default function Home() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(0);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [search, setSearch] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [NSFW, setNSFW] = useState<boolean>(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const scrollRef = useRef<HTMLInputElement | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [pageRange] = usePagination(totalPages, currentPage);
  const [skeleton, setSkeleton] = useState<boolean>(true);
  const [error, setError] = useState<string | null>("");

  const {
    isOpen: isOpenDwr,
    onOpen: onOpenDwr,
    onClose: onCloseDrw,
  } = useDisclosure();
  const {
    isOpen: isOpenPop,
    onOpen: onOpenPop,
    onClose: onClosePop,
    onToggle,
  } = useDisclosure();

  // animes request
  const getAnimes = async (
    page: number,
    searchAnime: string,
    sfw: boolean,
    selectedGenres: string[]
  ) => {
    const { data, status, error } = await $anime.getAnimes({
      page,
      search: searchAnime,
      sfw,
      genres: selectedGenres,
    });
    if (error) {
      setError(error);
    }
    if (data) {
      setItemsPerPage(data.pagination.items.count);
      setAnimeList(data.data);
      setTotalPages(data.pagination?.last_visible_page);
      setCurrentPage(page);
      window.scrollTo({
        behavior: "smooth",
        top: scrollRef?.current?.offsetTop,
      });
    }
    setSkeleton(false);
  };
  // category request
  const getAnimeGenres = async () => {
    const { data } = await $anime.getAnimeGenres();
    if (data) {
      setGenres(data.data);
    }
  };

  // pagination - previous
  const onPreviousPage = () => {
    const page = currentPage - 1;
    getAnimes(page, search, NSFW, selectedGenres);
    setCurrentPage(page);
  };
  // pagination - next
  const onNextPage = () => {
    const page = currentPage + 1;
    getAnimes(page, search, NSFW, selectedGenres);
    setCurrentPage(page);
  };

  // input component
  const debounceRef = useRef<NodeJS.Timeout>();

  const onChangeSearch = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setAnimeList([]);
    debounceRef.current = setTimeout(() => {
      if (!inputRef.current) return;
      setSearch(inputRef.current.value);
      setCurrentPage(1);
    }, 1000);
  };

  const onCleanInput = () => {
    if (!inputRef.current) return;
    inputRef.current.value = "";
    setSearch("");
  };

  // filter component
  const onChangeSwitch = () => {
    setNSFW(!NSFW);
  };

  const onSelectGenre = (id: string) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter((item) => item !== id));
      return;
    }
    setSelectedGenres([...selectedGenres, id]);
  };

  const onSearchFilter = () => {
    setAnimeList([]);
    setSkeleton(true);
    onClosePop();
    if (currentPage === 1) {
      getAnimes(currentPage, search, NSFW, selectedGenres);
    }
    setCurrentPage(1);
    setTimeout(() => {
      setSkeleton(false);
    }, 1000);
  };
  const onCleanFilter = () => {
    setSelectedGenres([]);
    setNSFW(true);
  };

  // drawer component
  const onOpenDrawer = (item: Anime) => {
    onOpenDwr();
    setSelectedAnime(item);
  };

  // pages butoons
  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getAnimes(currentPage, search, NSFW, selectedGenres);
  }, [currentPage, search]);

  useEffect(() => {
    getAnimeGenres();
  }, []);

  return (
    <>
      <Head>
        <title>Jikan Client App</title>
      </Head>
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
        <Flex minW={{ base: "345px", md: "700px" }} gap="3">
          <InputGroup>
            <InputRightElement color="#4e42d4" ref={scrollRef}>
              {search === "" ? (
                <Search2Icon />
              ) : (
                <IconButton
                  aria-label=""
                  size="xs"
                  icon={<CloseIcon />}
                  onClick={onCleanInput}
                />
              )}
            </InputRightElement>
            <Input
              ref={inputRef}
              disabled={skeleton}
              borderColor="#4e42d4"
              focusBorderColor="#4e42d4"
              type="text"
              placeholder="Type anime name"
              _placeholder={{ color: "gray" }}
              onChange={() => onChangeSearch()}
            />
          </InputGroup>
          <FilterContent
            skeleton={skeleton}
            isOpen={isOpenPop}
            NSFW={NSFW}
            onChangeSwitch={onChangeSwitch}
            genres={genres}
            selectedGenres={selectedGenres}
            onSelectGenre={onSelectGenre}
            onFilterSearch={onSearchFilter}
            onCleanFilter={onCleanFilter}
            btnTigger={
              <IconButton
                onClick={onToggle}
                aria-label="Filter database"
                icon={<IoFilter />}
                disabled={skeleton}
              />
            }
          />
        </Flex>

        {error && <ErrorAlert error={error} />}
        {!error && (
          <>
            <AnimeCards
              items={animeList}
              onOpenDrawer={onOpenDrawer}
              loading={skeleton}
            />
            {selectedAnime && (
              <AnimeDrawer
                isOpen={isOpenDwr}
                onClose={onCloseDrw}
                item={selectedAnime}
              />
            )}
            {itemsPerPage === 0 && (
              <HStack>
                <Text>Try with another name.</Text>
                <Icon as={BsEmojiWink} />
              </HStack>
            )}
            {animeList.length > 0 && (
              <ButtonGroup variant="solid" display="flex" mt="1.5rem">
                <Button
                  onClick={onPreviousPage}
                  maxH="32px"
                  width={{ base: "30px", md: "55px" }}
                  bg="#E5E5E5"
                  disabled={currentPage < 2}
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
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  onClick={onNextPage}
                  maxH="32px"
                  width={{ base: "30px", md: "55px" }}
                  bg="#E5E5E5"
                  disabled={currentPage === totalPages || skeleton}
                >
                  ››
                </Button>
              </ButtonGroup>
            )}
          </>
        )}
      </Container>
    </>
  );
}
