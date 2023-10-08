import WorkSideContentIcons from "@/components/work/WorkSideContentIcons";
import WorkSideProjectOutline from "@/components/work/WorkSideProjectOutline";

interface WorkSideContentProps {}
export default function WorkSideContent({}: WorkSideContentProps) {
  return (
    <div>
      <WorkSideContentIcons />

      <div>
        <WorkSideProjectOutline />
      </div>
    </div>
  );
}
