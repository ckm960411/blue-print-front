export type DateTime = Date | string;

export type Priority = 1 | 2 | 3 | 4 | 5;

export enum Progress {
  ToDo = "ToDo",
  InProgress = "InProgress",
  Review = "Review",
  Completed = "Completed",
}
