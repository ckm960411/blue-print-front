import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { createExerciseType } from "@/utils/services/health";
import { ExerciseType } from "@/utils/types/health";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

interface CreateExerciseTypeProps {
  onSuccess?: (type: ExerciseType) => void;
}
export default function CreateExerciseType({
  onSuccess,
}: Readonly<CreateExerciseTypeProps>) {
  const queryClient = useQueryClient();
  const { openToast } = useToastMessage();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");

  const { mutate: createExerciseTypeRequest } = useMutation(
    ["create-exercise-type"],
    ({ name, unit }: { name: string; unit: string }) =>
      createExerciseType({ name, unit }),
    {
      onSuccess: (type) => {
        queryClient.invalidateQueries(["exerciseType"]);
        resetState();
        setIsEditing(false);
        onSuccess?.(type);
      },
      onError: (e: any) => {
        openToast({
          status: "error",
          title: "생성 오류",
          description:
            e?.response?.data?.message ||
            "운동 타입 생성 중 문제가 발생했습니다.",
        });
      },
    },
  );

  const resetState = () => {
    setName("");
    setUnit("");
  };

  if (isEditing) {
    const handleConfirm = () => {
      const _name = name.trim();
      const _unit = unit.trim();

      if (!_name || !_unit) {
        return openToast({
          status: "warning",
          title: "생성 오류",
          description: "이름 또는 단위를 작성해주세요.",
        });
      }

      createExerciseTypeRequest({ name, unit });
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
