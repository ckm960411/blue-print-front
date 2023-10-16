export interface Memo {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string;
  title: string;
  content: string;
  isChecked: boolean;
  isBookmarked: boolean;
  color?: string;
  // TODO: Link 타입 필요
  // link         ?: Link[],
  // Milestone    ?: Milestone[],
  milestoneId: number | null;
  // Project      ?: Project,
  projectId: number | null;
}
