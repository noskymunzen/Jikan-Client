import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsFillStarFill } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import Anime from "../types/anime";

export interface AnimeCardProps {
  items: Anime[];
  onOpenDrawer: (item: Anime) => void;
  loading: boolean;
}

const AnimeCards = ({ items, onOpenDrawer, loading }: AnimeCardProps) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} spacing={5}>
      {loading &&
        [...Array(25)].map((_, i) => {
          return (
            <Stack
              key={i}
              direction={{ base: "row", md: "column" }}
              justify="center"
            >
              <Skeleton startColor="#dbd9f6" endColor="#837ae0">
                <Flex
                  width={{ base: "169.19px", md: "197px" }}
                  height={{ base: "300px", md: "300px" }}
                ></Flex>
              </Skeleton>
              <Stack
                align="center"
                justify={{ base: "flex-start", md: "space-between" }}
                bg="#dbd9f6"
                width={{ base: "175.81px", md: "200px" }}
                height={{ base: "300px", md: "196px" }}
                spacing={{ base: "1rem", md: "0" }}
                pb="0.3rem"
              >
                <SkeletonText
                  mt="1rem"
                  mb={{ base: "5rem", md: "0" }}
                  noOfLines={2}
                  spacing="3"
                  skeletonHeight="2"
                  width={{ base: "145px", md: "170px" }}
                />
                <Skeleton borderRadius={5} width="140px" height="40px" />
              </Stack>
            </Stack>
          );
        })}
      {!loading &&
        items?.map((item, i) => (
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
              justifyContent="space-between"
            >
              <Box>
                <HStack mx="2" mt="5px">
                  <Icon as={BsFillStarFill} color="#efb810" />
                  <Text>{item?.score}</Text>
                </HStack>
                <Text mx="2" mt="0.5rem">
                  {item?.title}
                </Text>
              </Box>
              <Center mb="5px">
                <Button
                  onClick={() => onOpenDrawer(item)}
                  mt="1rem"
                  leftIcon={<FaRegEye />}
                  fontSize="sm"
                  bg="#dbd9f6"
                >
                  Watch Details
                </Button>
              </Center>
            </Box>
          </Flex>
        ))}
    </SimpleGrid>
  );
};

export default AnimeCards;
