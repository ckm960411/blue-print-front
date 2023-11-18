import { ColorKey } from "@/utils/common/color";
import { DateTime, Link, Priority, Progress } from "@/utils/types";
import { Memo } from "@/utils/types/memo";
import { Tag } from "@/utils/types/tag.index";
import { Task } from "@/utils/types/task";

export type Milestone = {
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
  color: ColorKey;
  tags: Tag[];
  links: Link[];
  tasks: Task[];
  memos: Memo[];
  projectId?: number;
};

export type MilestoneContentCount = {
  commentCount: number;
  taskCount: number;
  memoCount: number;
};

export type MilestoneWithContentCount = Milestone & MilestoneContentCount;

export enum MilestoneClassification {
  Feature = "Feature",
  Chore = "Chore",
  Refactor = "Refactor",
  Hotfix = "Hotfix",
  OKR = "OKR",
  etc = "etc",
}
