import CircularProgressWrapper from "@/components/components/CircularProgressWrapper";

interface ProjectOutlineSummaryProps {}
export default function ProjectOutlineSummary({}: ProjectOutlineSummaryProps) {
  // TODO: 실제 데이터 반영
  const data = [
    { percentage: 52.6, color: "#001487" },
    { percentage: 42.3, color: "#10b981" },
  ];

  return (
    <div className="flex flex-col gap-24px border-b border-gray-200 py-16px">
      <div className="flex flex-col gap-8px">
        <div className="flex-between text-14px font-medium text-gray-600">
          <p>OKR 진척도</p>
          <p>오늘 업무 진행도</p>
        </div>
        <div className="flex-between text-24px font-bold text-gray-800">
          {data.map(({ percentage, color }, i) => (
            <div key={i} className="flex items-center gap-6px">
              <CircularProgressWrapper
                value={percentage}
                w={24}
                strokeWidth={14}
                pathColor={color}
              />
              <p>{percentage}%</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="flex-between">
          <p className="text-14px font-medium text-gray-600">전체 OKR 분포</p>
          <p className="text-14px font-bold text-gray-800">
            {Math.floor(((52.6 + 42.3) / 2) * 10) / 10}%
          </p>
        </div>
        <div className="flex h-8px items-center justify-start overflow-hidden rounded-md bg-gray-200">
          {data.map(({ percentage, color }, i) => (
            <div
              key={i}
              className="h-full"
              style={{
                width: `${percentage / 2}%`,
                backgroundColor: color,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
