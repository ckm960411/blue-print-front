import { Progress } from "@/utils/types";

export const GET_ALL_MEMOS = "getAllMemos";
const getAllMemos = (...args: any[]) => [GET_ALL_MEMOS, ...args];

const getAllTasks = (...args: any[]) => ["get-all-tasks", ...args];

const getThisMonthTasks = (...args: any[]) => ["get-this-month-tasks", ...args];

const getAllMilestones = (...args: any[]) => ["get-all-milestones", ...args];

export const QueryKeys = {
  // MEMO
  getAllMemos,

  // TASK
  getAllTasks,

  // this month tasks
  getThisMonthTasks,

  // MILESTONE
  getAllMilestones,
};
