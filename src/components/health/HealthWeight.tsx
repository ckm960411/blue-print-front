import { useState } from "react";
import { useQuery } from "react-query";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/modal";

import { getWeights } from "@/utils/services/health";
import InlineCalendarForm from "@/components/health/InlineCalendarForm";

enum WeightState {
  INCREASED = "INCREASED",
  DECREASED = "DECREASED",
  NONE = "NONE",
}

export default function HealthWeight() {
  const { data: weightData } = useQuery(["getWeights"], getWeights, {
    onError: console.error,
  });

  const [weight, setWeight] = useState(80);
  const [date, setDate] = useState(new Date());

  const {
    isOpen: isOpenWeightModal,
    onOpen: openWeightModal,
    onClose: closeWeightModal,
  } = useDisclosure();

  if (!weightData) return <></>;

  const { monthAgo, weekAgo, today } = weightData;

  const getWeightState = (
    before: number | undefined,
    after: number | undefined,
  ) => {
    if (!before || !after) return WeightState.NONE;
    if (before > after) return WeightState.DECREASED;
    if (before < after) return WeightState.INCREASED;
    return WeightState.NONE;
  };

  const getWeightStateClassName = (
    before: number | undefined,
    after: number | undefined,
  ) => {
    const weightState = getWeightState(before, after);
    if (weightState === WeightState.INCREASED) return "text-red-500";
    if (weightState === WeightState.DECREASED) return "text-blue-500";
    return "text-gray-800";
  };

  return (
    <>
      <div className="px-16px pb-16px">
        <div className="rounded-md shadow-md">
          <div className="p-16px">
            <p className="text-14px font-bold text-main">📉 체중</p>
            <div className="mt-16px grid grid-cols-3 gap-8px text-14px font-medium">
              <div className="flex-center flex-col gap-8px">
                <p>한달 전</p>
                <p className="text-gray-600">
                  {monthAgo ? `${monthAgo} kg` : "없음"}
                </p>
              </div>
              <div className="flex-center flex-col gap-8px">
                <p>일주일 전</p>
                <p className={getWeightStateClassName(monthAgo, weekAgo)}>
                  {weekAgo ? `${weekAgo} kg` : "없음"}
                </p>
              </div>
              <div className="flex-center flex-col gap-8px">
                <p>오늘</p>
                <p className={getWeightStateClassName(weekAgo, today)}>
                  {today ? `${today} kg` : "없음"}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={openWeightModal}
            className="w-full border-t border-gray-200 p-12px text-14px font-medium text-main"
          >
            체중 추가
          </button>
        </div>
      </div>

      <Modal isOpen={isOpenWeightModal} onClose={closeWeightModal} size="xs">
        <ModalOverlay />
        <ModalContent className="flex flex-col gap-16px p-16px">
          <ModalCloseButton />
          <div className="text-18px font-bold">체중 추가</div>
          <div className="flex flex-col gap-16px">
            <div>
              <input
                value={weight}
                type="number"
                onChange={(e) => setWeight(+e.target.value)}
                className="w-60px rounded-sm border border-gray-200 px-8px py-4px text-16px focus:bg-blue-50"
              />
              <span className="ml-4px text-16px font-medium text-gray-800">
                kg
              </span>
            </div>
            <InlineCalendarForm date={date} onChangeDate={(v) => setDate(v)} />
          </div>
          <div className="flex items-center justify-end gap-8px">
            <button
              onClick={closeWeightModal}
              className="rounded-sm border border-gray-200 px-8px py-6px text-14px"
            >
              닫기
            </button>
            <button className="rounded-sm bg-main px-8px py-6px text-14px font-medium text-white">
              추가
            </button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
