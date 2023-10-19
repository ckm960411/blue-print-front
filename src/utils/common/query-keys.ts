import { Progress } from "@/utils/types";

export const GET_ALL_MEMOS = "getAllMemos";
const getAllMemos = (showChecked?: boolean) => [GET_ALL_MEMOS, showChecked];

const getAllTasks = (progress?: Progress) => ["get-all-tasks", progress];

export const QueryKeys = {
  // MEMO
  getAllMemos,

  // TASK
  getAllTasks,
};
