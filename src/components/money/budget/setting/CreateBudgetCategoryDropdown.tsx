import { Colors } from "@/utils/common/color";
import { useBudgetCategoriesQuery } from "@/utils/hooks/react-query/money/useBudgetCategoriesQuery";
import { BudgetCategory } from "@/utils/types/money";
import { Button } from "@chakra-ui/button";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import React from "react";
import { IoChevronDownSharp } from "react-icons/io5";

interface CreateBudgetCategoryDropdownProps {
  currentCategory: BudgetCategory | null;
  onSelect: (category: BudgetCategory | null) => void;
  hasNoneOption?: boolean;
}
export default function CreateBudgetCategoryDropdown({
  currentCategory,
  onSelect,
  hasNoneOption = false,
}: Readonly<CreateBudgetCategoryDropdownProps>) {
  const { data: categories = [] } = useBudgetCategoriesQuery();

  if (categories.length === 0) return <></>;

  return (
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
        {hasNoneOption && (
          <MenuItem
            onClick={() => onSelect(null)}
            className="py-8px text-left text-14px"
            _hover={{ bg: Colors.gray[50] }}
          >
            선택
          </MenuItem>
        )}
        {categories.map((category) => (
          <MenuItem
            key={category.id}
            onClick={() => onSelect(category)}
            className="py-8px text-left text-14px"
            _hover={{ bg: Colors.gray[50] }}
          >
            {category.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
