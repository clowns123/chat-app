import * as React from "react";
import { VStack, Button, Flex, Input } from "@chakra-ui/react";
import { db } from "../firebase";
import { useData } from "../contexts/useData";
import RoomCard from "../components/RoomCard";

function ChatRoomList() {
  const { state } = useData();
  const [value, setValue] = React.useState("");

  const handleAddRoom = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (value === "") return;
    const room = {
      date: new Date(),
      title: value,
      owner: state.user!.id,
    };
    db.collection("chats").add(room);
    setValue("");
  };

  return (
    <Flex flexDir="column" h="full">
      {state.isLogin && (
        <Flex as="form" w="full" onSubmit={handleAddRoom}>
          <Input
            bg="gray.600"
            color="gray.300"
            border="none"
            flex={1}
            size="sm"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="채팅방 이름을 입력하세요."
            rounded="none"
          />
          <Button type="submit" size="sm" rounded="none" colorScheme="facebook">
            추가
          </Button>
        </Flex>
      )}
      <VStack flex={1} overflowY="auto" alignItems="stretch" py="2">
        {state.chats.map((el) => (
          <RoomCard key={el.id} room={el} />
        ))}
      </VStack>
    </Flex>
  );
}

export default ChatRoomList;
