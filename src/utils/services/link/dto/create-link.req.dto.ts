export interface CreateLinkReqDto {
  name: string;
  href: string;
  taskId?: number;
  milestoneId?: number;
}
