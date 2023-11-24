import { deleteCall, get, patch, post } from "@/app/api/axios";
import { UpdateMilestoneReqDto } from "@/utils/services/milestone/dto/update-milestone.req.dto";
import { Pagination, Progress } from "@/utils/types";
import { Milestone, MilestoneWithContentCount } from "@/utils/types/milestone";

export const getAllMilestones = async (params?: {
  progress?: Progress;
  projectId?: number;
}) => {
  const { data } = await get<Milestone[]>(`milestone`, { params });
  return data;
};

export const getAllMilestonesV2 = async (params?: {
  progresses?: Progress[];
  projectId?: number;
  page?: number;
  pageSize?: number;
}) => {
  const { data } = await get<Pagination<MilestoneWithContentCount>>(
    `milestone`,
    { params },
  );
  return data;
};

export const getMilestoneById = async (id: number) => {
  const { data } = await get<Milestone>(`milestone/${id}`);
  return data;
};

export const createMilestone = async (projectId?: number) => {
  const { data } = await post<
    Omit<Milestone, "tags" | "links" | "tasks" | "memos">
  >(`milestone`, { projectId });
  return data;
};

export const updateMilestone = async (
  id: number,
  updateMilestoneReqDto: UpdateMilestoneReqDto,
) => {
  const { data } = await patch<Milestone>(
    `milestone/${id}`,
    updateMilestoneReqDto,
  );
  return data;
};

export const deleteMilestone = async (id: number) => {
  const { data } = await deleteCall<Milestone>(`milestone/${id}`);
  return data;
};
