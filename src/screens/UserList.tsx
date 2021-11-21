import * as React from "react";
import { VStack, Flex, Text, Avatar, useDisclosure } from "@chakra-ui/react";
import { User } from "../types";
import { useData } from "../contexts/useData";
import UserModal from "../components/UserModal";

function UserList() {
  const { state } = useData();
  const [user, setUser] = React.useState<User | null>(null);
  const modal = useDisclosure();

  const handleUser = (el: User) => {
    setUser(el);
    modal.onOpen();
  };

  return (
    <>
      <UserModal user={user} {...modal} />
      <Flex h="full">
        <VStack flex={1} overflowY="auto" alignItems="stretch" py="2">
          {state.users.map((el) => (
            <Flex
              p="2"
              py="1"
              key={el["id"]}
              cursor="pointer"
              fontSize="sm"
              align="center"
              onClick={() => handleUser(el)}
            >
              <Avatar name={el.name} size="sm" mr="2" />
              <Text color="blue.100">{el.name}</Text>
            </Flex>
          ))}
        </VStack>
      </Flex>
    </>
  );
}

export default UserList;
