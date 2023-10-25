import { ColorKey } from "@/utils/common/color";
import { Progress } from "@/utils/types";

export interface UpdateMilestoneReqDto {
  startAt?: Date;
  endAt?: Date;
  title?: string;
  unicode?: string;
  classification?: string;
  priority?: 1 | 2 | 3 | 4 | 5;
  progress?: Progress;
  isClosed?: boolean;
  isBookmarked?: boolean;
  color?: ColorKey;
  projectId?: number;
}
