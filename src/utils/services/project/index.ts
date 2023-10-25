import { deleteCall, get, patch, post } from "@/app/api/axios";
import { CreateProjectReqDto } from "@/utils/services/project/dto/create-project.req.dto";
import { Project } from "@/utils/types/project";

export const createProject = async () => {
  const { data } = await post(`project`, "");
  return data;
};

export const getAllProjects = async () => {
  const { data } = await get<Project[]>(`project`);
  return data;
};

export const updateProject = async (
  id: number,
  updateProjectReqDto: Partial<CreateProjectReqDto>,
) => {
  const { data } = await patch<Project>(`project/${id}`, updateProjectReqDto);
  return data;
};

export const deleteProject = async (id: number) => {
  const { data } = await deleteCall(`project/${id}`);
  return data;
};
