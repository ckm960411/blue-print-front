import { TaskWithMilestone } from "@/utils/services/task";

interface TaskListCardProps {
  task: TaskWithMilestone;
}
export default function TaskListCard({ task }: Readonly<TaskListCardProps>) {
  return <div>TaskListCard</div>;
}
