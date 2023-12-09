import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { useState } from "react";

interface CreateExerciseTypeProps {}
export default function CreateExerciseType({}: Readonly<CreateExerciseTypeProps>) {
  const { openToast } = useToastMessage();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");

  const resetState = () => {
    setName("");
    setUnit("");
  };

  if (isEditing) {
    const handleConfirm = () => {
      const _name = name.trim();
      const _unit = unit.trim();

      if (!unit) {
        return openToast({
          status: "warning",
          title: "생성 오류",
          description: "단위를 작성해주세요.",
        });
      }

      resetState();
    };

    return (
      <div className="flex flex-col gap-12px rounded-md border border-main p-16px">
        <p className="text-16px font-semibold">운동 추가</p>
        <div className="flex items-center gap-8px text-14px">
          <span>운동 이름 : </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ex) 한강 수면위 달리기"
            className="rounded-sm border border-gray-200 px-8px py-2px text-12px placeholder:text-12px focus:border-main"
          />
        </div>
        <div className="flex items-center gap-8px text-14px">
          <span>운동 단위 : </span>
          <input
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="ex) 개, km"
            className="rounded-sm border border-gray-200 px-8px py-2px text-12px placeholder:text-12px focus:border-main"
          />
        </div>
        <div className="flex items-center justify-end gap-8px text-14px">
          <button
            onClick={() => {
              setIsEditing(false);
              resetState();
            }}
            className="rounded-md border border-gray-200 px-8px py-6px font-medium duration-200 hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="rounded-md border border-gray-200 px-8px py-6px font-medium duration-200 hover:bg-main hover:text-white"
          >
            생성
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsEditing(true)}
        className="text-14px text-gray-600 underline"
      >
        운동 추가하기
      </button>
    </div>
  );
}
