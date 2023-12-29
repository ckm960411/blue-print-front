import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import React from "react";

interface CreateExpenditureModalProps {
  year: number;
  month: number;
  isOpen: boolean;
  onClose: () => void;
}
export default function CreateExpenditureModal({
  year,
  month,
  isOpen,
  onClose,
}: Readonly<CreateExpenditureModalProps>) {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {};

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="full"
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>이번 달 수입/지출</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{/* 수입 or 지출*/}</ModalBody>
        <ModalFooter>
          <div className="flex items-center gap-8px">
            <button
              onClick={handleClose}
              className="rounded-md px-12px py-10px text-14px font-medium duration-200 hover:bg-gray-100"
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              className="rounded-md bg-main px-12px py-10px text-14px font-semibold text-white duration-200 hover:bg-main"
            >
              확인
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
