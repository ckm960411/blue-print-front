export interface CreateTaskReqDto {
  title: string;
  description?: string;
  content?: string;
  milestoneId?: number;
  projectId?: number;
}
