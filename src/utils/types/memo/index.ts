import { ColorKey } from "@/utils/common/color";

export interface Memo {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string;
  title: string;
  content: string;
  isChecked: boolean;
  isBookmarked: boolean;
  color: ColorKey;
  milestoneId: number | null;
  projectId: number | null;
}
