import { Task } from "@/utils/types/task";

interface TaskContentFormProps {
  task: Task;
}
export default function TaskContentForm({ task }: TaskContentFormProps) {
  return (
    <div
      className="px-24px text-16px leading-[150%] text-gray-700"
      dangerouslySetInnerHTML={{ __html: task.content ?? "" }}
    />
  );
}
