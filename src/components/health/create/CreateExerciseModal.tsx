import InlineCalendarForm from "@/components/health/create/InlineCalendarForm";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useMediaQuery } from "react-responsive";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

import { ExerciseType } from "@/utils/types/health";
import { exerciseKeys } from "@/utils/common/query-keys";
import { useToastMessage } from "@/utils/hooks/chakra/useToastMessage";
import { meState } from "@/utils/recoil/store";
import { createExercise } from "@/utils/services/health";
import { CreateExerciseReqDto } from "@/utils/services/health/dto/create-exercise.req.dto";

import CreateExerciseDescription from "@/components/health/create/CreateExerciseDescription";
import CreateExerciseSelectType from "@/components/health/create/CreateExerciseSelectType";
import CreateExerciseCount from "@/components/health/create/CreateExerciseCount";
import CreateExerciseType from "@/components/health/create/CreateExerciseType";
import { useRecoilValue } from "recoil";

interface CreateExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreateExerciseModal({
  isOpen,
  onClose,
}: Readonly<CreateExerciseModalProps>) {
  const [exerciseType, setExerciseType] = useState<ExerciseType | null>(null);
  const [count, setCount] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const me = useRecoilValue(meState);
  const UNDER_768PX = useMediaQuery({ query: "(max-width: 767px)" });
  const queryClient = useQueryClient();
  const { openToast } = useToastMessage();

  const resetState = () => {
    setExerciseType(null);
    setCount(0);
    setDescription("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const { mutate: createExerciseRequest } = useMutation(
    ["create-exercise"],
    (createExerciseReqDto: CreateExerciseReqDto) =>
      createExercise(createExerciseReqDto),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(exerciseKeys.default);
        handleClose();
      },
      onError: (e: any) => {
        openToast({
          status: "error",
          title: "생성 오류",
          description:
            e?.response?.data?.message || "운동 작성 중 문제가 발생했습니다.",
        });
      },
    },
  );

  const handleCreate = () => {
    if (!exerciseType) {
      return openToast({
        status: "warning",
        description: "운동 타입을 선택해주세요",
      });
    }

    if (!count) {
      return openToast({
        status: "warning",
        description: "운동 횟수를 입력해주세요",
      });
    }

    createExerciseRequest({
      exerciseTypeId: exerciseType.id,
      date,
      count,
      description,
    });
  };

  return (
    <Modal
      onClose={handleClose}
      size={UNDER_768PX ? "full" : "lg"}
      isOpen={isOpen}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>오늘 한 운동 추가</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex flex-col gap-16px p-16px">
          <div className="flex grow flex-col gap-16px">
            <p className="text-16px font-medium">어떤 운동을 했나요?</p>
            <div className="flex items-center gap-16px text-14px">
              <CreateExerciseSelectType
                exerciseType={exerciseType}
                onSelect={(type) => setExerciseType(type)}
              />
              <CreateExerciseCount
                exerciseType={exerciseType}
                count={count}
                onChangeCount={(value) => setCount(isNaN(value) ? 0 : value)}
              />
            </div>
            <CreateExerciseType onSuccess={(type) => setExerciseType(type)} />
            <CreateExerciseDescription
              description={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <InlineCalendarForm date={date} onChangeDate={(v) => setDate(v)} />
          </div>
          <div className="flex items-center justify-end gap-16px">
            <button
              onClick={handleClose}
              className="rounded-md border border-gray-200 px-12px py-8px text-16px font-medium duration-200 hover:bg-gray-100"
            >
              닫기
            </button>
            <button
              onClick={handleCreate}
              className="rounded-md border border-gray-200 bg-main px-12px py-8px text-16px font-medium text-white duration-200"
            >
              작성하기
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
