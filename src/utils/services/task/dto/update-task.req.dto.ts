import { Priority, Progress } from "@/utils/types";

export interface UpdateTaskReqDto {
  title?: string;
  description?: string;
  content?: string;
  startAt?: Date;
  endAt?: Date;
  progress?: Progress;
  priority?: Priority;
  isBookmarked?: boolean;
  milestoneId?: number;
  projectId?: number;
}
