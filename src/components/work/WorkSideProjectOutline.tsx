import ProjectQuarter from "@/components/work/ProjectQuarter";
import ProjectOutlineSummary from "@/components/work/ProjectOutlineSummary";
import ProjectOutlineOKRs from "@/components/work/ProjectOutlineOKRs";
import ProjectOutlineToDoContainer from "@/components/work/ProjectOutlineToDoContainer";

interface WorkSideProjectOutlineProps {}
export default function WorkSideProjectOutline({}: WorkSideProjectOutlineProps) {
  return (
    <div className="px-16px">
      <div className="flex-between border-b border-gray-200 pb-16px">
        <p className="text-18px font-bold">Project Outline</p>
        <ProjectQuarter />
      </div>
      <ProjectOutlineSummary />
      <ProjectOutlineOKRs />
      <ProjectOutlineToDoContainer />
    </div>
  );
}
