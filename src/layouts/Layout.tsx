import * as React from "react";
import { Container, Center, Box } from "@chakra-ui/react";
import BottomNav from "./BottomNav";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { useData } from "../contexts/useData";

type Prop = { children: React.ReactNode };

function Layout({ children }: Prop) {
  const { state } = useData();
  const { pathname } = useLocation();
  const isHide = !pathname.startsWith("/chat/") && state.isLogin;
  return (
    <Center h="100vh" p="2" bg="gray.50">
      <Container p="0" maxW="sm" bg="gray.700" rounded="md" overflow="hidden">
        <Header />
        <Box h={isHide ? "450px" : "486px"}>{children}</Box>
        {isHide && <BottomNav />}
      </Container>
    </Center>
  );
}

export default Layout;
