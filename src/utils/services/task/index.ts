import { post } from "@/app/api/axios";
import { CreateTaskReqDto } from "@/utils/services/task/dto/create-task.req.dto";

export const createTask = async (createTaskReqDto: CreateTaskReqDto) => {
  const { data } = await post(`task`, createTaskReqDto);
  return data;
};
