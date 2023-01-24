import { Flex, Text } from "@chakra-ui/react";

export interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <Flex h="60px" w="100%" bg="#4e42d4" position="sticky" top="0" zIndex="20">
      <Flex
        ml="2"
        w="100%"
        justifyContent={{ base: "center", md: "flex-start" }}
        alignItems="center"
        gap={{ base: "1", md: "6" }}
      >
        <Text
          fontSize={{ base: "xl", md: "xl" }}
          ml={{ base: "0", md: "1rem" }}
          color="white"
          fontWeight="bold"
        >
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Header;
