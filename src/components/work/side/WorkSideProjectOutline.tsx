import ProjectOutlineSummary from "@/components/work/ProjectOutlineSummary";
import ProjectOutlineOKRs from "@/components/work/ProjectOutlineOKRs";
import ProjectOutlineToDoContainer from "@/components/work/ProjectOutlineToDoContainer";

interface WorkSideProjectOutlineProps {}
export default function WorkSideProjectOutline({}: WorkSideProjectOutlineProps) {
  return (
    <div>
      <div className="flex-between border-b border-gray-200 pb-16px">
        <p className="text-18px font-bold">Project Outline</p>
      </div>
      <ProjectOutlineSummary />
      <ProjectOutlineOKRs />
      <ProjectOutlineToDoContainer />
    </div>
  );
}
