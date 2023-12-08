import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface HealthDailyExercisesProps {}
export default function HealthDailyExercises({}: Readonly<HealthDailyExercisesProps>) {
  return (
    <div className="px-16px pb-16px">
      <div className="border-b border-gray-200 py-16px text-center text-16px font-medium">
        데일리 오운완
      </div>

      <div className="flex-center gap-16px py-12px text-14px">
        <button className="flex-center h-24px w-24px">
          <FaChevronLeft />
        </button>
        <span className="font-bold text-main">YYYY.MM.DD</span>
        <button className="flex-center h-24px w-24px">
          <FaChevronRight />
        </button>
      </div>

      <div className="flex-center h-160px">
        <button className="flex-center flex-col gap-16px p-16px">
          <span className="text-40px">🏆</span>
          <span className="text-14px font-medium">
            운동하고 꾸준함 +1 스택 쌓기
          </span>
        </button>
      </div>

      {/*<div className="flex flex-col gap-8px">*/}
      {/*  <div className="flex flex-col gap-8px rounded-md border border-main p-16px text-14px shadow-md">*/}
      {/*    <div className="flex-between">*/}
      {/*      <p className="flex items-center gap-4px font-bold text-main">*/}
      {/*        <span>🏆</span>*/}
      {/*        <span className="truncate-1-lines grow">턱걸이</span>*/}
      {/*      </p>*/}
      {/*      <p className="text-gray-700">*/}
      {/*        횟수 <span className="font-bold text-main">n ea</span>*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*    <p className="truncate-2-lines leading-[140%] text-gray-700">*/}
      {/*      오늘은 간단하게 10분 3번정도 땡김 Lorem ipsum dolor sit amet,*/}
      {/*      consectetur adipisicing elit.*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*  <div className="flex flex-col gap-8px rounded-md border border-main p-16px text-14px shadow-md">*/}
      {/*    <div className="flex-between">*/}
      {/*      <p className="flex items-center gap-4px font-bold text-main">*/}
      {/*        <span>🏆</span>*/}
      {/*        <span className="truncate-1-lines grow">턱걸이</span>*/}
      {/*      </p>*/}
      {/*      <p className="text-gray-700">*/}
      {/*        횟수 <span className="font-bold text-main">n ea</span>*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*    <p className="truncate-2-lines leading-[140%] text-gray-700">*/}
      {/*      오늘은 간단하게 10분 3번정도 땡김 Lorem ipsum dolor sit amet,*/}
      {/*      consectetur adipisicing elit.*/}
      {/*    </p>*/}
      {/*  </div>*/}

      {/*  <button className="w-full rounded-md bg-main p-8px text-14px font-bold text-white shadow-md">*/}
      {/*    운동 추가*/}
      {/*  </button>*/}
      {/*</div>*/}
    </div>
  );
}
