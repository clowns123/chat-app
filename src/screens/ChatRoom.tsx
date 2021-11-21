import * as React from "react";
import { useParams } from "react-router-dom";
import { Flex, VStack, Input, Box } from "@chakra-ui/react";
import { db } from "../firebase";
import { useData } from "../contexts/useData";
import MsgCard from "../components/MsgCard";
import { Chat } from "../types";

function ChatRoom() {
  const { state, setRoom } = useData();
  const { chatId } = useParams<{ chatId: string }>();
  const [value, setValue] = React.useState("");
  const [chats, setChats] = React.useState<Chat[]>([]);
  const focus = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    let unsubscribe = db
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("date", "asc")
      .onSnapshot((snapshot) => {
        let chats: Chat[] = [];
        snapshot.forEach((doc) => {
          const msg = doc.data();
          chats.push({ ...msg, id: doc.id, date: msg.date.toDate() } as Chat);
        });
        setChats(chats);
        if (focus.current) focus.current.scrollIntoView();
      });
    return () => {
      setRoom("");
      unsubscribe();
    };
  }, [setRoom, chatId]);

  const handleAddMsg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === "") return;
    const msg = {
      msg: value,
      date: new Date(),
      name: state.user!.name,
      userId: state.user!.id,
    };
    db.collection("chats").doc(chatId).collection("messages").add(msg);
    setValue("");
  };

  return (
    <Flex flexDir="column" h="full">
      <VStack flex={1} p="2" overflowY="auto" align="stretch">
        {chats.map((el) => (
          <MsgCard key={el.id} msg={el} />
        ))}
        <Box ref={focus} />
      </VStack>
      <form onSubmit={handleAddMsg}>
        <Input
          h="10"
          bg="gray.800"
          color="gray.100"
          border="none"
          borderTop="1px solid #eee"
          size="sm"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="메시지를 입력하세요."
          rounded="none"
        />
      </form>
    </Flex>
  );
}

export default ChatRoom;
