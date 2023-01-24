import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/roboto/400.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          bg: "#f7f9fb",
        },
      }),
    },
    fonts: {
      body: `'Roboto', sans-serif;`,
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
