import { deleteCall, get, post } from "@/app/api/axios";
import { Project } from "@/utils/types/project";

export const createProject = async () => {
  const { data } = await post(`project`, "");
  return data;
};

export const getAllProjects = async () => {
  const { data } = await get<Project[]>(`project`);
  return data;
};

export const deleteProject = async (id: number) => {
  const { data } = await deleteCall(`project/${id}`);
  return data;
};
