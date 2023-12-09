import { Button } from "@chakra-ui/button";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { IoChevronDownSharp } from "react-icons/io5";

import { Colors } from "@/utils/common/color";
import { ExerciseType } from "@/utils/types/health";
import { useAllExerciseTypeQuery } from "@/utils/hooks/react-query/health/useAllExerciseTypeQuery";

interface CreateExerciseSelectTypeProps {
  type: ExerciseType | null;
  onSelect: (type: ExerciseType) => void;
}
export default function CreateExerciseSelectType({
  type,
  onSelect,
}: Readonly<CreateExerciseSelectTypeProps>) {
  const exerciseTypes = useAllExerciseTypeQuery();

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
        {type?.name ?? "선택"}
      </MenuButton>
      <MenuList>
        {exerciseTypes.map((type) => (
          <MenuItem
            key={type.id}
            onClick={() => onSelect(type)}
            className="py-4px text-left text-14px"
            _hover={{ bg: Colors.gray[50] }}
          >
            {type.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
