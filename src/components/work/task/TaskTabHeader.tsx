interface TaskTabHeaderProps {}
export default function TaskTabHeader({}: TaskTabHeaderProps) {
  return (
    <div className="p-16px">
      <div className="flex">
        <div className="flex grow flex-col gap-8px">
          <p className="text-20px font-semibold text-gray-800">Daily Tasks</p>
          <div className="flex w-full max-w-[420px] items-center gap-8px">
            <span className="text-14px font-medium text-gray-600">진행도</span>
            <div className="h-4px flex-shrink-0 grow rounded-full bg-gray-100"></div>
            <span>nn%</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <button className="rounded-md bg-gray-50 px-8px py-6px text-14px duration-200 hover:bg-gray-100">
            할일 추가
          </button>
        </div>
      </div>
    </div>
  );
}