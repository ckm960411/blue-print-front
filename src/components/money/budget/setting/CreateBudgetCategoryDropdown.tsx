import { Colors } from "@/utils/common/color";
import { QueryKeys } from "@/utils/common/query-keys";
import { useMe } from "@/utils/common/user/useMe";
import { getAllBudgetCategories } from "@/utils/services/money";
import { BudgetCategory } from "@/utils/types/money";
import { Button } from "@chakra-ui/button";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import React from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { useQuery } from "react-query";

interface CreateBudgetCategoryDropdownProps {
  currentCategory: BudgetCategory | null;
  onSelect: (category: BudgetCategory) => void;
}
export default function CreateBudgetCategoryDropdown({
  currentCategory,
  onSelect,
}: Readonly<CreateBudgetCategoryDropdownProps>) {
  const me = useMe();

  const { data: categories = [] } = useQuery(
    QueryKeys.getAllBudgetCategories([me?.id]),
    getAllBudgetCategories,
    { onError: console.error },
  );

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
