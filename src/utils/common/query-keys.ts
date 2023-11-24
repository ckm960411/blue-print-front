import { omit } from "lodash";

export const GET_ALL_MEMOS = "getAllMemos";
const getAllMemos = (...args: any[]) => [GET_ALL_MEMOS, ...args];

const getAllTasks = (...args: any[]) => ["get-all-tasks", ...args];

const getThisMonthTasks = (...args: any[]) => ["get-this-month-tasks", ...args];

const getAllMilestones = (...args: any[]) => ["get-all-milestones", ...args];

const getMilestoneById = (id: number) => ["get-milestone-by-id", id];

const getAllProjects = (...args: any[]) => ["get-all-projects", ...args];

const getAllComments = (...args: any[]) => ["get-all-comments", ...args];

const getWorkCount = (...args: any[]) => ["get-work-count", ...args];

export const QueryKeys = {
  // WORK
  getWorkCount,

  // MEMO
  getAllMemos,

  // TASK
  getAllTasks,

  // COMMENT
  getAllComments,

  // this month tasks
  getThisMonthTasks,

  // MILESTONE
  getAllMilestones,
  getMilestoneById,

  // PROJECTS
  getAllProjects,
};

export const milestoneKeys = {
  all: (projectId?: number) => ["milestones", projectId] as const,
  list: (projectId?: number) =>
    [...milestoneKeys.all(projectId), "list"] as const,
  details: (projectId?: number) =>
    [...milestoneKeys.all(projectId), "detail"] as const,
  detail: (milestoneId: number, projectId?: number) =>
    [...milestoneKeys.details(projectId), milestoneId] as const,
};

type TaskKeysAllArgs = { projectId?: number; milestoneId?: number };
export const taskKeys = {
  all: (arg: TaskKeysAllArgs) => ["tasks", ...Object.values(arg)] as const,
  list: (arg: TaskKeysAllArgs) => [...taskKeys.all(arg), "list"] as const,
  details: (arg: TaskKeysAllArgs) => [...taskKeys.all(arg), "detail"] as const,
  detail: ({ taskId, ...rest }: TaskKeysAllArgs & { taskId: number }) =>
    [...taskKeys.details(omit(rest, "taskId")), taskId] as const,
};
