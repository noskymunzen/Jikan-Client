import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

const ErrorAlert = ({ error }: { error: string }) => {
  return (
    <Alert
      maxW="700px"
      bg="#d4d1f4"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} color="#4e42d4" />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Error
      </AlertTitle>
      <AlertDescription maxWidth="sm">{error}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
