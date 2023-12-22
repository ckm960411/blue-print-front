import InlineCalendarForm from "@/components/health/InlineCalendarForm";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { createWeight } from "@/utils/services/health";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

interface HealthWeightModalProps {
  open: boolean;
  onClose: () => void;
}
export default function HealthWeightModal({
  open,
  onClose,
}: Readonly<HealthWeightModalProps>) {
  const { openToast } = useToastMessage();
  const queryClient = useQueryClient();

  const [weight, setWeight] = useState(80);
  const [date, setDate] = useState(new Date());

  const resetState = () => {
    setWeight(80);
    setDate(new Date());
  };

  const handleClose = () => {
    onClose();
    resetState();
  };

  const { mutate: createWeightRequest } = useMutation(
    ["createWeight"],
    createWeight,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getWeights"]);
        handleClose();
      },
      onError: console.error,
    },
  );

  const handleCreate = () => {
    if (weight === 0) {
      return openToast({
        status: "warning",
        title: "체중 오류",
        description: "체중을 올바르게 적어주세요.",
      });
    }
    createWeightRequest({ weight, date });
  };

  return (
    <Modal isOpen={open} onClose={handleClose} size="xs">
      <ModalOverlay />
      <ModalContent className="flex flex-col gap-16px p-16px">
        <ModalCloseButton />
        <div className="text-18px font-bold">체중 추가</div>
        <div className="flex flex-col gap-16px">
          <div>
            <input
              value={weight}
              type="number"
              onChange={(e) => setWeight(+e.target.value)}
              className="w-60px rounded-sm border border-gray-200 px-8px py-4px text-16px focus:bg-blue-50"
            />
            <span className="ml-4px text-16px font-medium text-gray-800">
              kg
            </span>
          </div>
          <InlineCalendarForm date={date} onChangeDate={(v) => setDate(v)} />
        </div>
        <div className="flex items-center justify-end gap-8px">
          <button
            onClick={handleClose}
            className="rounded-sm border border-gray-200 px-8px py-6px text-14px"
          >
            닫기
          </button>
          <button
            onClick={handleCreate}
            className="rounded-sm bg-main px-8px py-6px text-14px font-medium text-white"
          >
            추가
          </button>
        </div>
      </ModalContent>
    </Modal>
  );
}
