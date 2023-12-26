import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { getMonth } from "date-fns";
import React from "react";

interface SettingCategoryBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreateCategoryBudgetModal({
  isOpen,
  onClose,
}: Readonly<SettingCategoryBudgetModalProps>) {
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
        <ModalHeader>카테고리별 예산 책정하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>카테고리별 예산 책정하기</div>
        </ModalBody>
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
