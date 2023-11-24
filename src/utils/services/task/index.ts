import { deleteCall, get, patch, post } from "@/app/api/axios";
import { ColorKey } from "@/utils/common/color";
import { CreateTaskReqDto } from "@/utils/services/task/dto/create-task.req.dto";
import { UpdateTaskReqDto } from "@/utils/services/task/dto/update-task.req.dto";
import { Progress } from "@/utils/types";
import { Task } from "@/utils/types/task";

export type TaskWithMilestone = Task & {
  milestoneTitle: string | null;
  milestoneColor: ColorKey | null;
};
export const getAllTask = async (params?: {
  projectId: number;
  milestoneId?: number;
}) => {
  const { data } = await get<Record<Progress, TaskWithMilestone[]>>(`task`, {
    params,
  });
  return data;
};

export const getAllUrgenttTasks = async (params?: { milestoneId?: number }) => {
  const { data } = await get<Task[]>(`task/urgent`, { params });
  return data;
};

export const getThisMonthTasks = async (params?: {
  projectId?: number;
  year?: number;
  month?: number;
}) => {
  const { data } = await get<Task[]>(`task/month`, { params });
  return data;
};

export const getOneTaskById = async (taskId: number) => {
  const { data } = await get<Task>(`task/${taskId}`);
  return data;
};

export const createTask = async (createTaskReqDto: CreateTaskReqDto) => {
  const { data } = await post<Task>(`task`, createTaskReqDto);
  return data;
};

export const updateTask = async (
  id: number,
  updateTaskReqDto: UpdateTaskReqDto,
) => {
  const { data } = await patch<Task>(`task/${id}`, updateTaskReqDto);
  return data;
};

export const deleteTask = async (id: number) => {
  const { data } = await deleteCall(`task/${id}`);
  return data;
};
