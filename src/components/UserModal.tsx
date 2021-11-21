import * as React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { User } from "../types";

type Prop = {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
};

function UserModal({ user, isOpen, onClose }: Prop) {
  return (
    <>
      <Modal size="xs" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{user?.name}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserModal;
