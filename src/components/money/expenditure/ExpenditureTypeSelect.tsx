import { ALL_EXPENDITURE } from "@/components/money/expenditure/ExpenditureList";
import { Colors } from "@/utils/common/color";
import { useBudgetCategoriesQuery } from "@/utils/hooks/react-query/money/useBudgetCategoriesQuery";
import { Button } from "@chakra-ui/button";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import React from "react";
import { IoChevronDownSharp } from "react-icons/io5";

interface ExpenditureTypeSelectProps {
  expenditureType: string;
  onSelect: (type: string) => void;
}
export default function ExpenditureTypeSelect({
  expenditureType,
  onSelect,
}: Readonly<ExpenditureTypeSelectProps>) {
  const { data: categoryNames = [] } = useBudgetCategoriesQuery({
    select: (categories) => categories.map((category) => category.name),
  });

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<IoChevronDownSharp />}
        _expanded={{ bg: "#fff" }}
        className="truncate-1-lines h-20px w-96px p-0px text-left text-14px"
        style={{ display: "flex" }}
      >
        {expenditureType}
      </MenuButton>
      <MenuList>
        {[ALL_EXPENDITURE, ...categoryNames].map((type) => (
          <MenuItem
            key={type}
            onClick={() => onSelect(type)}
            className="w-120px py-8px text-left text-14px"
            _hover={{ bg: Colors.gray[50] }}
          >
            {type}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
