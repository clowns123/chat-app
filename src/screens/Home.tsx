import * as React from "react";
import { Button, Center, HStack, Input, Text } from "@chakra-ui/react";
import { useData } from "../contexts/useData";
import { db } from "../firebase";
import Loading from "../components/Loading";

function Home() {
  const { state, setLogin, updateName, setLogout } = useData();
  const [value, setValue] = React.useState(state.user?.name || "");
  const [change, setChange] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSetLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let userId;
    const user = await db.collection("users").where("name", "==", value).get();
    if (user.empty) {
      const result = await db
        .collection("users")
        .add({ createdAt: new Date(), name: value });
      userId = result.id;
    } else {
      userId = user.docs.pop()?.id;
    }
    setLogin({ id: userId, name: value });
    setLoading(false);
  };

  const handleChangeName = () => {
    setChange(true);
  };

  const handleUpdateName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await db.collection("users").doc(state.user!.id).update({ name: value });
    updateName(value);
    setChange(false);
    setLoading(false);
  };

  const handleLogout = () => {
    setLogout();
    setValue("");
  };

  return (
    <Center flexDir="column" p="10" w="full" h="full" pos="relative">
      {state.isLogin ? (
        <>
          <HStack>
            <Text color="blue.100">{state.user!.name}</Text>
            <Text color="gray.300">{"님 안녕하세요?"}</Text>
          </HStack>
          <HStack mt="2">
            <Button size="xs" colorScheme="facebook" onClick={handleChangeName}>
              이름변경
            </Button>
            <Button size="xs" onClick={handleLogout}>
              로그아웃
            </Button>
          </HStack>
        </>
      ) : (
        <>
          <Text fontSize="sm" color="gray.100">
            비밀번호는 없어요
          </Text>
          <form onSubmit={handleSetLogin}>
            <Input
              bg="gray.600"
              color="gray.300"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="이름이 뭐에요?"
              mt="2"
            />
          </form>
        </>
      )}
      {change && (
        <form onSubmit={handleUpdateName}>
          <Input
            bg="gray.600"
            color="gray.300"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            mt="2"
          />
        </form>
      )}
      {loading && <Loading />}
    </Center>
  );
}

export default Home;
