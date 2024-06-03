import React, { PropsWithChildren, useEffect } from 'react';
import {
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure,
} from '@nextui-org/react';

type ErrorModalProps = {
  clearError(): void
};

export default function ErrorModal({ children, clearError }: PropsWithChildren<ErrorModalProps>) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (children) onOpen();
  }, [children, onOpen, onClose]);

  return (
    <Modal
      size="xs"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setTimeout(clearError, 500);
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Error</ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
