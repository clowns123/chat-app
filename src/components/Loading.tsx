import * as React from "react";
import { Center } from "@chakra-ui/react";

function Loading() {
  return (
    <Center
      zIndex="100"
      h="full"
      w="full"
      pos="absolute"
      bg="rgba(0,0,0,0.9)"
      color="white"
    >
      로딩 중
    </Center>
  );
}

export default Loading;
