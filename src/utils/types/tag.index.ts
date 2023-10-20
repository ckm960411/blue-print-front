import { ColorKey } from "@/utils/common/color";

export interface Tag {
  id: number;
  name: string;
  color: ColorKey;
  taskId: number | null;
  milestoneId: number | null;
}
