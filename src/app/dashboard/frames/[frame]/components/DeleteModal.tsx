import React, { PropsWithChildren } from 'react';
import {
  Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
} from '@nextui-org/react';
import { TrashIcon } from '@heroicons/react/24/outline';

type DeleteModalProps = {
  isOpen: boolean,
  onClose: () => void;
  onDelete: () => void;
  isLoading: boolean,
};

export default function DeleteModal({
  isOpen, onClose, onDelete, isLoading, children,
}: PropsWithChildren<DeleteModalProps>) {
  return (
    <Modal size="xs" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Delete Confirmation</ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="danger" onPress={onDelete} endContent={<TrashIcon className="size-4" />} isLoading={isLoading}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
