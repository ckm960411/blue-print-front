import NumberInputController from "@/components/components/NumberInputController";
import { QueryKeys } from "@/utils/common/query-keys";
import { upsertBalance } from "@/utils/services/money";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

interface SettingBalanceModalProps {
  isOpen: boolean;
  balance: number;
  onClose: () => void;
}
export default function SettingBalanceModal({
  isOpen,
  balance: originBalance,
  onClose,
}: Readonly<SettingBalanceModalProps>) {
  const queryClient = useQueryClient();

  const [balance, setBalance] = useState(() => originBalance);

  const { mutate: upsertBalanceRequest } = useMutation(
    ["upsert-balance"],
    upsertBalance,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.getBalance());
        handleClose();
      },
      onError: console.error,
    },
  );

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    upsertBalanceRequest(balance);
  };

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
        <ModalHeader>잔고 설정</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex items-center gap-8px">
            <span>잔액 : </span>
            <NumberInputController
              value={balance}
              onChange={(_, value) => setBalance(value)}
              width={32}
              max={1_000_000_000}
              step={10_000}
            />
            <span>원</span>
          </div>
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
