import { get, patch, post } from "@/app/api/axios";
import { UpdateMilestoneReqDto } from "@/utils/services/milestone/dto/update-milestone.req.dto";
import { Milestone } from "@/utils/types/milestone";

export const getAllMilestones = async () => {
  const { data } = await get<Milestone[]>(`milestone`);
  return data;
};

export const createMilestone = async () => {
  const { data } = await post<
    Omit<Milestone, "tags" | "links" | "tasks" | "memos">
  >(`milestone`, "");
  return data;
};

export const updateMilestone = async (
  id: number,
  updateMilestoneReqDto: UpdateMilestoneReqDto,
) => {
  const { data } = await patch(`milestone/${id}`, updateMilestoneReqDto);
  return data;
};
