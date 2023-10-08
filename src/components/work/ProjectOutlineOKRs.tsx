import CircularProgressWrapper from "@/components/components/CircularProgressWrapper";

interface ProjectOutlineOKRsProps {}
export default function ProjectOutlineOKRs({}: ProjectOutlineOKRsProps) {
  // TODO: 실제 데이터 반영 필요
  const data = [
    { title: "OKR 1", percentage: 80, color: "#0ea5e9" },
    { title: "OKR 2", percentage: 10, color: "#14b8a6" },
    { title: "OKR 3", percentage: 56, color: "#f97316" },
    { title: "OKR 4", percentage: 22, color: "#ec4899" },
  ];

  return (
    <div className="py-16px">
      <div className="grid grid-cols-4">
        {data.map(({ title, percentage, color }, index) => (
          <div key={index} className="flex-center flex-col gap-12px">
            <div
              className={`flex-center flex w-full ${
                index === 0 ? "" : "border-l border-gray-200"
              }`}
            >
              <CircularProgressWrapper
                value={percentage}
                w={40}
                pathColor={color}
              />
            </div>
            <div className="truncate-1-lines px-4px text-center text-12px font-medium text-gray-600">
              {title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
