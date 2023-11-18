interface TaskTabContentProps {}
export default function TaskTabContent({}: TaskTabContentProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-16px">
      <div className="grid grid-cols-4 gap-8px">
        <div className="flex flex-col gap-16px">
          <div className="flex items-center gap-8px text-14px font-semibold">
            <div className="h-12px w-12px rounded-full bg-orange-500"></div>
            <span>To Do</span>
            <div className="flex-center h-14px min-w-[14px] rounded-full bg-white text-12px font-medium text-gray-600">
              n
            </div>
          </div>
          <div className="rounded-md bg-white p-16px">content</div>
        </div>
        <div className="flex flex-col gap-16px">
          <div className="flex items-center gap-8px text-14px font-semibold">
            <div className="h-12px w-12px rounded-full bg-blue-500"></div>
            <span>In Progress</span>
            <div className="flex-center h-14px min-w-[14px] rounded-full bg-white text-12px font-medium text-gray-600">
              n
            </div>
          </div>
          <div className="rounded-md bg-white p-16px">content</div>
        </div>
        <div className="flex flex-col gap-16px">
          <div className="flex items-center gap-8px text-14px font-semibold">
            <div className="h-12px w-12px rounded-full bg-purple-500"></div>
            <span>Review</span>
            <div className="flex-center h-14px min-w-[14px] rounded-full bg-white text-12px font-medium text-gray-600">
              n
            </div>
          </div>
          <div className="rounded-md bg-white p-16px">content</div>
        </div>
        <div className="flex flex-col gap-16px">
          <div className="flex items-center gap-8px text-14px font-semibold">
            <div className="h-12px w-12px rounded-full bg-green-500"></div>
            <span>Completed</span>
            <div className="flex-center h-14px min-w-[14px] rounded-full bg-white text-12px font-medium text-gray-600">
              n
            </div>
          </div>
          <div className="rounded-md bg-white p-16px">content</div>
        </div>
      </div>
    </div>
  );
}
