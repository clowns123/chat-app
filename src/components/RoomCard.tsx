import * as React from "react";
import { useHistory } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/react";
import { useData } from "../contexts/useData";
import { db } from "../firebase";
import moment from "moment";
import "moment/locale/ko";
import { Room } from "../types";

type Prop = {
  room: Room;
};

function RoomCard({ room }: Prop) {
  const { state, setRoom } = useData();
  const history = useHistory();

  const handleJoinRoom = () => {
    setRoom(room.title);
    history.push(`/chat/${room.id}`);
  };

  const handleDeleteRoom = () => {
    db.collection("chats").doc(room.id).delete();
  };

  return (
    <Flex p="2" py="1" fontSize="sm" align="center">
      <Text
        color="blue.100"
        flex={1}
        cursor="pointer"
        noOfLines={1}
        _hover={{ color: "gray.500", textDecoration: "underline" }}
        onClick={handleJoinRoom}
      >
        {room.title}
      </Text>
      <Text fontSize="xs" color="gray.500" mx="2">
        {moment(room.date).fromNow()}
      </Text>
      {state.user?.id === room.owner && (
        <Button size="xs" colorScheme="red" onClick={handleDeleteRoom}>
          삭제
        </Button>
      )}
    </Flex>
  );
}

export default RoomCard;
