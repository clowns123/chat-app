import * as React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useData } from "../contexts/useData";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  const { state } = useData();

  const handleLeave = () => {
    history.goBack();
  };

  return (
    <Flex bg="gray.900" h="10" px="2" align="center">
      <Text color="gray.100" fontWeight="bold">
        파이어베이스 메세지
      </Text>
      <Text ml="1" color="blue.100">
        {state.user?.name}
      </Text>
      <Flex flex={1} justify="flex-end" align="center">
        {state.room && (
          <>
            <Text
              color="gray.300"
              fontSize="sm"
              noOfLines={1}
              maxW="150px"
            >{`💬 ${state.room}`}</Text>
            <Button
              ml="2"
              size="xs"
              colorScheme="facebook"
              onClick={handleLeave}
            >
              나가기
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default Header;
