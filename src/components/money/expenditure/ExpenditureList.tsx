"use client";

import SpaceY from "@/components/common/SpaceY";
import { Colors } from "@/utils/common/color";
import { useBudgetCategoriesQuery } from "@/utils/hooks/react-query/money/useBudgetCategoriesQuery";
import { Button } from "@chakra-ui/button";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import React, { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";

const ALL = "전체 내역";

export default function ExpenditureList() {
  const { data: categoryNames = [] } = useBudgetCategoriesQuery({
    select: (categories) => categories.map((category) => category.name),
  });

  const [expenditureType, setExpenditureType] = useState<string>(ALL);

  return (
    <div>
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
          {["전체", ...categoryNames].map((type) => (
            <MenuItem
              key={type}
              onClick={() => setExpenditureType(type)}
              className="w-120px py-8px text-left text-14px"
              _hover={{ bg: Colors.gray[50] }}
            >
              {type}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <SpaceY height={16} />

      <div>
        <div>
          <div className="flex-between border-b border-gray-200 py-6px">
            <div className="flex items-center gap-12px">
              <span className="text-24px font-bold text-red-500">26</span>
              <div className="flex flex-col gap-4px text-12px">
                <span>2023.12</span>
                <span>일요일</span>
              </div>
            </div>
            <div className="flex-center gap-8px text-14px font-medium">
              <span className="text-blue-500">nnn,nnn원</span>
              <span className="w-80px text-end text-red-500">nn,nnn원</span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-8px py-6px">
              <div className="w-72px text-12px font-medium text-gray-400">
                교통비
              </div>
              <div className="flex grow flex-col gap-6px">
                <p className="text-14px font-semibold">카카오택시</p>
                <p className="text-12px text-gray-400">오후 7:38</p>
              </div>
              <div className="fotn-medium w-88px text-end text-14px text-red-500">
                nnn,nnn원
              </div>
            </div>
            <div className="flex items-center gap-8px py-6px">
              <div className="w-72px text-12px font-medium text-gray-400">
                교통비
              </div>
              <div className="flex grow flex-col gap-6px">
                <p className="text-14px font-semibold">카카오택시</p>
                <p className="text-12px text-gray-400">오후 7:38</p>
              </div>
              <div className="fotn-medium w-88px text-end text-14px text-red-500">
                nnn,nnn원
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
