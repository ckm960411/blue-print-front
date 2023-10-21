import { post } from "@/app/api/axios";
import { Milestone } from "@/utils/types/milestone";

export const createMilestone = async () => {
  const { data } = await post<Omit<Milestone, "tags" | "links" | "tasks">>(
    `milestone`,
    "",
  );
  return data;
};
