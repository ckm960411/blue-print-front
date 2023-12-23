import { FaChevronRight } from "react-icons/fa6";
import SpaceY from "@/components/common/SpaceY";

export default function CategoryBudget() {
  return (
    <div>
      <div className="flex-between">
        <p className="text-16px font-bold">카테고리별 예산</p>
        <button className="p-2px text-14px font-bold text-main">
          카테고리 설정
        </button>
      </div>
      <SpaceY height={32} />
      <div className="flex flex-col gap-24px">
        <div className="flex flex-col gap-16px">
          <div className="flex-between">
            <div className="flex-center gap-12px">
              <div className="rounded-full bg-blue-50 p-12px text-24px">🍽️</div>
              <span className="text-16px font-semibold">식비</span>
              <span className="text-16px font-medium text-gray-600">11%</span>
            </div>
            <div className="flex-center gap-4px">
              <span className="font-semibold text-gray-700">34,290원</span>
              <FaChevronRight className="text-gray-400" />
            </div>
          </div>
          <div className="h-8px overflow-hidden rounded-xl bg-gray-100">
            <div className="h-full w-[30%] bg-blue-500" />
          </div>
          <div className="flex-between text-14px font-medium text-gray-500">
            <span>예산 300,000원</span>
            <span>남은 예산 267,100원</span>
          </div>
          <div className="flex flex-col gap-8px">
            <div className="rounded-r-md border-l-4 border-main bg-slate-50 py-8px pl-16px pr-8px">
              <div className="flex-between text-16px">
                <span className="font-medium">슈퍼스타어반</span>
                <span className="font-medium text-gray-700">7,500원</span>
              </div>
              <div className="flex-end mt-8px text-14px text-gray-600">
                2023.12.24
              </div>
            </div>
            <div className="rounded-r-md border-l-4 border-main bg-slate-50 py-8px pl-16px pr-8px">
              <div className="flex-between text-16px">
                <span className="font-medium">고구려</span>
                <span className="font-medium text-gray-700">9,500원</span>
              </div>
              <div className="flex-end mt-8px text-14px text-gray-600">
                2023.12.22
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-16px">
          <div className="flex-between">
            <div className="flex-center gap-12px">
              <div className="rounded-full bg-blue-50 p-12px text-24px">💌</div>
              <span className="text-16px font-semibold">데이트비</span>
              <span className="text-16px font-medium text-gray-600">11%</span>
            </div>
            <div className="flex-center gap-4px">
              <span className="font-semibold text-gray-700">34,290원</span>
              <FaChevronRight className="text-gray-400" />
            </div>
          </div>
          <div className="h-8px overflow-hidden rounded-xl bg-gray-100">
            <div className="h-full w-[30%] bg-blue-500" />
          </div>
          <div className="flex-between text-14px font-medium text-gray-500">
            <span>예산 300,000원</span>
            <span>남은 예산 267,100원</span>
          </div>
          <div className="flex flex-col gap-8px">
            <div className="rounded-r-md border-l-4 border-main bg-slate-50 py-8px pl-16px pr-8px">
              <div className="flex-between text-16px">
                <span className="font-medium">슈퍼스타어반</span>
                <span className="font-medium text-gray-700">7,500원</span>
              </div>
              <div className="flex-end mt-8px text-14px text-gray-600">
                2023.12.24
              </div>
            </div>
            <div className="rounded-r-md border-l-4 border-main bg-slate-50 py-8px pl-16px pr-8px">
              <div className="flex-between text-16px">
                <span className="font-medium">고구려</span>
                <span className="font-medium text-gray-700">9,500원</span>
              </div>
              <div className="flex-end mt-8px text-14px text-gray-600">
                2023.12.22
              </div>
            </div>
          </div>
        </div>
      </div>

      <SpaceY height={32} />
      <div>
        <button className="w-full rounded-10px bg-main p-16px text-16px font-bold text-white shadow-lg">
          예산 추가하기
        </button>
      </div>
    </div>
  );
}
