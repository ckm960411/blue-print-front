import { Priority } from "@/utils/types";

export interface UpdateTaskReqDto {
  title?: string;
  description?: string;
  content?: string;
  startAt?: Date;
  endAt?: Date;
  priority?: Priority;
  isBookmarked?: boolean;
}
