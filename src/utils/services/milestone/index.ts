import { get, post } from "@/app/api/axios";
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
