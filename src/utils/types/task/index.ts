import { ColorKey } from "@/utils/common/color";
import { DateTime, Link, Priority, Progress } from "@/utils/types";
import { Tag } from "@/utils/types/tag.index";

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
  color: ColorKey;
  links: Link[];
  tags: Tag[];
  projectId: number | null;
  milestoneId: number | null;
}
