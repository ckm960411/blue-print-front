import { get, post } from "@/app/api/axios";
import { CreateTaskReqDto } from "@/utils/services/task/dto/create-task.req.dto";
import { Progress } from "@/utils/types";
import { Task } from "@/utils/types/task";

export const getAllTask = async (params?: { progress: Progress }) => {
  const { data } = await get<Task[]>(`task`, { params });
  return data;
};

export const createTask = async (createTaskReqDto: CreateTaskReqDto) => {
  const { data } = await post(`task`, createTaskReqDto);
  return data;
};
