import TaskTabContent from "@/components/work/task/TaskTabContent";
import TaskTabHeader from "@/components/work/task/TaskTabHeader";

interface TaskTabProps {}
export default function TaskTab({}: TaskTabProps) {
  return (
    <div>
      <TaskTabHeader />
      <TaskTabContent />
    </div>
  );
}
