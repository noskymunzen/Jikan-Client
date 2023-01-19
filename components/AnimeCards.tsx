import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Text,
  DrawerFooter,
  Image,
  Flex,
  Stack,
  Divider,
  Tag,
  Link,
  SimpleGrid,
  TagLeftIcon,
  TagLabel,
  Box,
  Center,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import Anime from "../types/anime";
import { GenreColors } from "../const/theme";
import { LinkIcon } from "@chakra-ui/icons";
import { BiPlay } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";

export interface AnimeCardProps {
  items: Anime[];
  onOpenDrawer: (item: Anime) => void;
}

const AnimeCards = ({ items, onOpenDrawer }: AnimeCardProps) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} spacing={5}>
      {items?.map((item, i) => (
        <Flex
          key={i}
          width={{ base: "350px", md: "200px" }}
          height={{ base: "300px", md: "500px" }}
          flexDirection={{ base: "row", md: "column" }}
          border="2px"
          borderColor="gray.100"
        >
          <Box width="197px" height="300px">
            <Image
              objectFit="cover"
              height="300px"
              width="197px"
              src={item.images.jpg.image_url}
            />
          </Box>
          <Box
            width="200px"
            height="200px"
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
          >
            <Box>
              <Text mx="2" mt="0.3rem">
                ⭐{item?.score}
              </Text>
              <Text mx="2" mt="0.5rem">
                {item?.title}
              </Text>
            </Box>
            <Center>
              <Button
                onClick={() => onOpenDrawer(item)}
                mt="1rem"
                leftIcon={<FaRegEye />}
                fontSize="sm"
              >
                watch details
              </Button>
            </Center>
          </Box>
        </Flex>
      ))}
    </SimpleGrid>
  );
};

export default AnimeCards;
