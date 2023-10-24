import { post } from "@/app/api/axios";

export const createProject = async () => {
  const { data } = await post(`project`, "");
  return data;
};
