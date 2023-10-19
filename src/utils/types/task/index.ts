import { DateTime, Priority, Progress } from "@/utils/types";

export interface Task {
  id: number;
  createdAt: DateTime;
  updatedAt: DateTime | null;
  deletedAt: DateTime | null;
  startAt: DateTime | null;
  endAt: DateTime | null;
  title: string;
  description: string | null;
  content: string | null;
  priority: Priority;
  isBookmarked: boolean;
  progress: Progress;
  projectId: number | null;
  milestoneId: number | null;
}
