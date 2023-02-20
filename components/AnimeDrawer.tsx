import { LinkIcon } from "@chakra-ui/icons";
import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { GenreColors } from "../const/theme";
import Anime from "../types/anime";

export interface AnimeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  item: Anime;
}

const AnimeDrawer = ({ isOpen, onClose, item }: AnimeDrawerProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Drawer
        size="md"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Stack direction="row" gap="3">
              <Text>{item?.title}</Text>
              <HStack>
                <Text>{item?.score}</Text>
                <Icon as={BsFillStarFill} color="#efb810" />
              </HStack>
            </Stack>
            <Text>{item?.title_japanese}</Text>
            <Divider border="1px" />
          </DrawerHeader>
          <DrawerBody>
            <Flex flexDirection="row">
              <Image
                objectFit="cover"
                height={{ base: "280px", md: "auto" }}
                width={{ base: "177px", md: "auto" }}
                src={item?.images.jpg.image_url}
              />

              <Stack direction="column" ml="1rem">
                {item.trailer.embed_url && (
                  <Link href={item.trailer.embed_url} mb="0.5rem">
                    <Tag variant="outline">
                      <TagLeftIcon as={LinkIcon} />
                      <TagLabel>Watch Trailer</TagLabel>
                    </Tag>
                  </Link>
                )}
                {item.episodes && (
                  <Flex gap="2">
                    <Text color="gray.600" as="b">
                      Episodes:
                    </Text>
                    <Text color="gray.600">{item.episodes}</Text>
                  </Flex>
                )}
                {item.duration && (
                  <Flex gap="2">
                    <Text color="gray.600" as="b">
                      Duration:
                    </Text>
                    <Text color="gray.600">{item.duration}</Text>
                  </Flex>
                )}
                {item.year && (
                  <Flex gap="2">
                    <Text color="gray.600" as="b">
                      Year:
                    </Text>
                    <Text color="gray.600">{item.year}</Text>
                  </Flex>
                )}
                {item.studios && (
                  <Flex gap="2" flexDirection="row">
                    <Text color="gray.600" as="b">
                      Studios:
                    </Text>
                    <SimpleGrid columns={2} gap={2}>
                      {item.studios.map((studio, i) => (
                        <Text color="gray.600" minW="82px" key={i}>
                          {studio.name}
                        </Text>
                      ))}
                    </SimpleGrid>
                  </Flex>
                )}
                {item.genres && (
                  <Flex gap="2" flexDirection="row">
                    <Text color="gray.600" as="b">
                      Genres:
                    </Text>
                    <SimpleGrid columns={1} gap={2}>
                      {item.genres.map((genre, i) => (
                        <Tag
                          minW="90px"
                          fontSize="sm"
                          key={i}
                          colorScheme={GenreColors[genre.name]}
                          borderRadius="full"
                        >
                          {genre.name}
                        </Tag>
                      ))}
                    </SimpleGrid>
                  </Flex>
                )}
              </Stack>
            </Flex>
            {item.synopsis && (
              <Flex flexDirection="column" px="5px" mt="1rem" pb="5px">
                <Text color="gray.600" as="b">
                  Synopsis
                </Text>
                <Divider border="2px" mt="3px" mb="10px" />
                <Text color="gray.700">{item.synopsis}</Text>
              </Flex>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AnimeDrawer;
