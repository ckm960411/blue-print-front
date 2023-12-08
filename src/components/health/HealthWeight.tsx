interface HealthWeightProps {}
export default function HealthWeight({}: Readonly<HealthWeightProps>) {
  return (
    <div className="px-16px pb-16px">
      <div className="rounded-md shadow-md">
        <div className="p-16px">
          <p className="text-14px font-bold text-main">📉 체중</p>
          <div className="mt-16px grid grid-cols-3 gap-8px text-14px font-medium">
            <div className="flex-center flex-col gap-8px">
              <p>한달 전</p>
              <p className="text-gray-600">nn.n kg</p>
            </div>
            <div className="flex-center flex-col gap-8px">
              <p>일주일 전</p>
              <p className="text-red-500">nn.n kg</p>
            </div>
            <div className="flex-center flex-col gap-8px">
              <p>오늘</p>
              <p className="font-bold text-blue-500">nn.n kg</p>
            </div>
          </div>
        </div>
        <button className="w-full border-t border-gray-200 p-12px text-14px font-medium text-main">
          체중 추가
        </button>
      </div>
    </div>
  );
}
