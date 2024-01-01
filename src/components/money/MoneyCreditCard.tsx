import { getRemainPayday } from "@/utils/common/money/getRemainPayday";

export default function MoneyCreditCard() {
  const remainPayday = getRemainPayday();

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-60px bg-main" />
      <div className="flex-center relative z-10 px-16px">
        <div className="w-full max-w-[320px] overflow-hidden rounded-10px bg-slate-50 text-14px text-gray-800 shadow-md">
          <div className="flex-end h-16px p-8px text-10px font-medium">
            경민은행
          </div>
          <div className="flex-end h-32px bg-gray-700 px-16px">
            <p className="text-14px font-semibold text-white">
              남은 잔고: nnn,nnn 원
            </p>
          </div>
          <div className="flex h-96px flex-col justify-between p-8px">
            <div className="flex flex-col gap-8px">
              <p className="text-12px text-gray-600">이번달 예상 지출액</p>
              <p className="text-18px font-bold">nnn,nnn원</p>
            </div>
            <div>
              <p className="text-12px text-gray-700">
                월급날까지 {remainPayday}일
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
