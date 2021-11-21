import * as React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import moment from "moment";
import "moment/locale/ko";
import { Chat } from "../types";
import { useData } from "../contexts/useData";

type Prop = { msg: Chat };

function MsgCard({ msg }: Prop) {
  const { state } = useData();
  const isMine = msg.userId === state.user!.id;
  return (
    <Flex flexDir="column" align={isMine ? "flex-end" : "flex-start"}>
      <Flex flexDir={isMine ? "row-reverse" : "row"} mb="1" align="center">
        <Text color="blue.100" fontSize="sm" fontWeight="bold">
          {msg.name}
        </Text>
        <Text fontSize="xs" color="gray.500" mx="2">
          {moment(msg.date).fromNow()}
        </Text>
      </Flex>
      <Box fontSize="sm" color="gray.100">
        {msg.msg}
      </Box>
    </Flex>
  );
}

export default MsgCard;
