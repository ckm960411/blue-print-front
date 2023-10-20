export interface UpdateTaskReqDto {
  title?: string;
  description?: string;
  content?: string;
  startAt?: Date;
  endAt?: Date;
  priority?: Date;
  isBookmarked?: boolean;
}
