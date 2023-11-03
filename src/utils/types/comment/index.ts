import { DateTime } from "@/utils/types";

export interface Comment {
  id: number;
  createdAt: DateTime;
  updatedAt: DateTime;
  deletedAt: DateTime;
  content: string;
  isChecked: boolean;
  isBookmarked: boolean;
  milestoneId?: number;
}
