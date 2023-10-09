import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Calendar } from "react-date-range";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { useState } from "react";
import { getDayByAsiaSeoulFormat } from "@/utils/common";

interface MilestoneCalendarButtonProps {
  onChange: (date: Date) => void;
  date?: Date;
  startDate?: Date;
  endDate?: Date;
}
export default function MilestoneCalendarButton({
  onChange,
  date,
  startDate,
  endDate,
}: MilestoneCalendarButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleChange = (date: Date) => {
    onChange(date);
    onClose();
  };

  return (
    <div>
      <button
        onClick={onOpen}
        className="rounded-md bg-gray-50 px-4px py-2px text-14px font-medium text-gray-800 hover:bg-gray-100"
      >
        {date
          ? format(date, `yyyy년 M월 d일 (${getDayByAsiaSeoulFormat(date)})`)
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
          <div className="px-16px">
            <Calendar
              locale={ko}
              date={selectedDate}
              onChange={handleChange}
              minDate={startDate}
              maxDate={endDate}
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