import { ColorKey } from "@/utils/common/color";

export interface CreateMemoReqDto {
  title: string;
  content: string;
  color?: ColorKey;
  milestoneId?: number;
}
