import * as React from "react";
import { Link as ReachLink, useLocation } from "react-router-dom";
import { Link, SimpleGrid, Center } from "@chakra-ui/react";
import { FiHome, FiUsers, FiMessageSquare } from "react-icons/fi";

type ButtonProp = {
  active: boolean;
  to: string;
  Icon: React.FC<{ fontSize: string; color: string }>;
};

function BottomButton({ active, to, Icon }: ButtonProp) {
  return (
    <Link as={ReachLink} to={to}>
      <Center h="full">
        <Icon fontSize="20" color={active ? "#bee3f8" : "#aaa"} />
      </Center>
    </Link>
  );
}

function BottomNav() {
  const { pathname } = useLocation();
  return (
    <SimpleGrid columns={3} h="9" bg="gray.900">
      <BottomButton active={pathname === "/"} to="/" Icon={FiHome} />
      <BottomButton
        active={pathname === "/userlist"}
        to="/userlist"
        Icon={FiUsers}
      />
      <BottomButton
        active={pathname.startsWith("/chat")}
        to="/chatlist"
        Icon={FiMessageSquare}
      />
    </SimpleGrid>
  );
}

export default BottomNav;
