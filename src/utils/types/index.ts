export type DateTime = Date | string;

export type Priority = 1 | 2 | 3 | 4 | 5;

export enum Progress {
  ToDo = "ToDo",
  InProgress = "InProgress",
  Review = "Review",
  Completed = "Completed",
}

export interface Link {
  id: number;
  name: string;
  href: string;
  taskId: number | null;
}

export interface Pagination<T> {
  items: T[];
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
  totalCount: number;
  totalPages: number;
}

export type MilestoneOrTask = "milestone" | "task";
