import { DateTime, Link, Priority, Progress } from "@/utils/types";
import { Tag } from "@/utils/types/tag.index";
import { Task } from "@/utils/types/task";

export interface Milestone {
  id: number;
  createdAt: DateTime;
  updatedAt: DateTime | null;
  deletedAt: DateTime | null;
  startAt: DateTime;
  endAt: DateTime | null;
  title: string;
  unicode: string;
  classification: string | null;
  priority: Priority;
  progress: Progress;
  isClosed: boolean;
  isBookmarked: boolean;
  tags: Tag[];
  links: Link[];
  tasks: Task[];
  projectId?: number;
}
