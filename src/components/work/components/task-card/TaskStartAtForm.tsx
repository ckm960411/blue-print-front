import { getDayByAsiaSeoulFormat } from "@/utils/common";
import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { format } from "date-fns";
import { Calendar } from "primereact/calendar";
import { useState } from "react";

interface TaskStartAtFormProps {}
export default function TaskStartAtForm({}: TaskStartAtFormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState<Date>();

  return (
    <div className="flex h-14px items-center gap-8px">
      <p className="truncate-1-lines w-80px text-14px font-medium text-gray-600">
        시작일
      </p>
      <button
        onClick={onOpen}
        className="rounded-md bg-gray-50 px-4px py-2px text-14px font-medium text-gray-800 hover:bg-gray-100"
      >
        {selectedDate
          ? format(
              selectedDate,
              `yyyy년 M월 d일 (${getDayByAsiaSeoulFormat(selectedDate)})`,
            )
          : "클릭하여 설정해주세요"}
      </button>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <div id="task-calendar" className="px-16px">
            <Calendar
              value={selectedDate}
              onChange={({ value }) => {
                setSelectedDate(value ? new Date(value) : new Date());
                onClose();
              }}
              inline
              showWeek
            />
          </div>
          <div className="px-16px pb-16px text-right">
            <button
              onClick={onClose}
              className="rounded-md px-12px py-8px text-16px font-medium text-gray-800 hover:bg-gray-50"
            >
              닫기
            </button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
