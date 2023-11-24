import { DateTime } from "@/utils/types";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Calendar } from "primereact/calendar";

interface CalendarModalProps {
  isOpen: boolean;
  date: DateTime | null;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: (date: Date) => void;
  minDate?: DateTime | null;
  maxDate?: DateTime | null;
}
export default function CalendarModal({
  isOpen,
  date,
  onUpdate,
  onClose,
  onDelete,
  minDate,
  maxDate,
}: CalendarModalProps) {
  return (
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
            value={date ? new Date(date) : undefined}
            onChange={({ value }) => {
              if (value) {
                onUpdate(value);
              }
              onClose();
            }}
            inline
            minDate={minDate ? new Date(minDate) : undefined}
            maxDate={maxDate ? new Date(maxDate) : undefined}
          />
        </div>
        <div className="flex items-center justify-end px-16px pb-16px">
          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="rounded-md px-12px py-8px text-16px font-medium text-gray-800 hover:bg-gray-50"
          >
            삭제
          </button>
          <button
            onClick={onClose}
            className="rounded-md px-12px py-8px text-16px font-medium text-gray-800 hover:bg-gray-50"
          >
            닫기
          </button>
        </div>
      </ModalContent>
    </Modal>
  );
}
