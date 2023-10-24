import { deleteCall, get, patch, post } from "@/app/api/axios";
import { UpdateMilestoneReqDto } from "@/utils/services/milestone/dto/update-milestone.req.dto";
import { Progress } from "@/utils/types";
import { Milestone } from "@/utils/types/milestone";

export const getAllMilestones = async (params?: { progress?: Progress }) => {
  const { data } = await get<Milestone[]>(`milestone`, { params });
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
  const { data } = await patch(`milestone/${id}`, updateMilestoneReqDto);
  return data;
};

export const deleteMilestone = async (id: number) => {
  const { data } = await deleteCall(`milestone/${id}`);
  return data;
};
