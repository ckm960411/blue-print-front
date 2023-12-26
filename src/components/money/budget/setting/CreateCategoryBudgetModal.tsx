import { Colors } from "@/utils/common/color";
import { useMe } from "@/utils/common/user/useMe";
import { getAllBudgetCategories } from "@/utils/services/money";
import { BudgetCategory } from "@/utils/types/money";
import { Button } from "@chakra-ui/button";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
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
import { IoChevronDownSharp } from "react-icons/io5";
import { useQuery } from "react-query";

interface SettingCategoryBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreateCategoryBudgetModal({
  isOpen,
  onClose,
}: Readonly<SettingCategoryBudgetModalProps>) {
  const me = useMe();
  const [currentCategory, setCurrentCategory] = useState<BudgetCategory | null>(
    null,
  );

  const { data: categories = [] } = useQuery(
    ["get-all-budget-categories", me?.id],
    getAllBudgetCategories,
    { onError: console.error },
  );

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
          <div className="flex flex-col gap-16px">
            <p className="text-18px font-bold">생성할 카테고리 선택</p>
            <div>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<IoChevronDownSharp />}
                  borderRadius="md"
                  borderWidth="1px"
                  _expanded={{ bg: "#fff" }}
                  className="truncate-1-lines w-144px px-8px py-4px text-left text-14px"
                  style={{ display: "flex" }}
                >
                  {currentCategory?.name ?? "선택"}
                </MenuButton>
                <MenuList>
                  {categories.map((category) => (
                    <MenuItem
                      key={category.id}
                      onClick={() => setCurrentCategory(category)}
                      className="py-8px text-left text-14px"
                      _hover={{ bg: Colors.gray[50] }}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
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
