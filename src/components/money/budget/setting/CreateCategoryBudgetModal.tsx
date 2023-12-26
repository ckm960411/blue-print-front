import PickerWrapper from "@/components/components/PickerWrapper";
import Unicode, { EmojiType } from "@/components/components/Unicode";
import CreateBudgetCategoryDropdown from "@/components/money/budget/setting/CreateBudgetCategoryDropdown";
import { BudgetCategory } from "@/utils/types/money";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useClickOutside } from "primereact/hooks";
import React, { useRef, useState } from "react";

interface SettingCategoryBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreateCategoryBudgetModal({
  isOpen,
  onClose,
}: Readonly<SettingCategoryBudgetModalProps>) {
  const [currentCategory, setCurrentCategory] = useState<BudgetCategory | null>(
    null,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [emoji, setEmoji] = useState("1f359");
  const [name, setName] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const pickerWrapperRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(pickerWrapperRef, () => setShowPicker(false));

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {};

  const handleEmojiSelect = (emoji: EmojiType) => {
    setEmoji(emoji.unified);
    setShowPicker(false);
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
        <ModalHeader>카테고리별 예산 책정하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col gap-16px">
            <p className="text-18px font-bold">생성할 카테고리 선택</p>
            <div className="flex flex-col gap-8px">
              <CreateBudgetCategoryDropdown
                currentCategory={currentCategory}
                onSelect={(category) => setCurrentCategory(category)}
              />

              <div>
                {isEditing ? (
                  <div className="flex flex-col gap-12px rounded-md border border-main p-16px">
                    <p className="text-16px font-semibold">카테고리 추가</p>
                    <div className="relative flex items-center gap-8px text-14px">
                      <Unicode
                        value={emoji}
                        onClick={() => setShowPicker(true)}
                        className="cursor-pointer"
                      />
                      {showPicker && (
                        <div
                          ref={pickerWrapperRef}
                          className="absolute left-0 top-0 z-10"
                        >
                          <PickerWrapper onEmojiSelect={handleEmojiSelect} />
                        </div>
                      )}
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="ex) 식비, 교통비"
                        className="rounded-sm border border-gray-200 px-8px py-4px text-12px placeholder:text-12px focus:border-main"
                      />
                    </div>
                    <div className="flex items-center justify-end gap-8px text-14px">
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          // resetState();
                        }}
                        className="rounded-md border border-gray-200 px-8px py-6px font-medium duration-200 hover:bg-gray-100"
                      >
                        취소
                      </button>
                      <button
                        // onClick={handleConfirm}
                        className="rounded-md border border-gray-200 px-8px py-6px font-medium duration-200 hover:bg-main hover:text-white"
                      >
                        생성
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-14px text-gray-600 underline"
                  >
                    카테고리 생성하기
                  </button>
                )}
              </div>
            </div>
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
