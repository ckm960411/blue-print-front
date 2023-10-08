import WorkSideContentIcons from "@/components/work/WorkSideContentIcons";
import ProjectQuarter from "@/components/work/ProjectQuarter";

interface WorkSideContentProps {}
export default function WorkSideContent({}: WorkSideContentProps) {
  return (
    <div>
      <WorkSideContentIcons />
      <div>
        <div className="px-16px">
          <div className="flex-between">
            <p className="text-18px font-bold">Project Outline</p>
            <ProjectQuarter />
          </div>
        </div>
      </div>
    </div>
  );
}
