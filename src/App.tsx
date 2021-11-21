import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { DataProvider } from "./contexts/useData";
import AppRoute from "./route";

function App() {
  return (
    <DataProvider>
      <ChakraProvider resetCSS>
        <AppRoute />
      </ChakraProvider>
    </DataProvider>
  );
}

export default App;
