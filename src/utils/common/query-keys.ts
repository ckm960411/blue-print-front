import { omit } from "lodash";

const getAllMemos = (...args: any[]) => ["getAllMemos", ...args];

const getThisMonthTasks = (...args: any[]) => ["get-this-month-tasks", ...args];

const getAllProjects = (...args: any[]) => ["get-all-projects", ...args];

const getAllComments = (...args: any[]) => ["get-all-comments", ...args];

const getWorkCount = (...args: any[]) => ["get-work-count", ...args];

const getBalance = (...args: any[]) => ["get-balance", ...args];

const getMonthlyBudget = (...args: any[]) => ["get-monthly-budget", ...args];

const getAllBudgetCategories = (...args: any[]) => [
  "get-all-budget-categories",
  ...args,
];

const getAllMonthlyBudgetCategoreis = (...args: any[]) => [
  "get-all-monthly-budget-categories",
  ...args,
];

const getTotalMonthlyExpenditure = (...args: any[]) => [
  "get-total-monthly-expenditure",
  ...args,
];

const getMonthlyExpenditures = (...args: any[]) => [
  "get-monthly-expenditures",
  ...args,
];

const getMonthlySpending = (...args: any[]) => [
  "get-monthly-spending",
  ...args,
];

export const QueryKeys = {
  // WORK
  getWorkCount,

  // MEMO
  getAllMemos,

  // COMMENT
  getAllComments,

  // this month tasks
  getThisMonthTasks,

  // PROJECTS
  getAllProjects,

  // MONEY
  getMonthlyBudget,
  getAllBudgetCategories,
  getAllMonthlyBudgetCategoreis,
  getTotalMonthlyExpenditure,
  getMonthlyExpenditures,
  getMonthlySpending,
  getBalance,
};

const projectKeys = {
  all: ["projects"] as const,
  list: () => [...projectKeys.all, "list"] as const,
  details: () => [...projectKeys.all, "detail"] as const,
  detail: (id: number) => [...projectKeys.details(), id] as const,
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
  urgent: (arg: TaskKeysAllArgs) => [...taskKeys.all(arg), "urgent"] as const,
};

type MemoKeysAllArgs = {
  projectId?: number;
  milestoneId?: number;
  showChecked?: boolean;
};
export const memoKeys = {
  all: (arg: MemoKeysAllArgs) => ["memos", arg] as const,
  list: (arg: MemoKeysAllArgs) => [...memoKeys.all(arg), "list"] as const,
  details: (arg: MemoKeysAllArgs) => [...memoKeys.all(arg), "detail"] as const,
  detail: ({ memoId, ...rest }: MemoKeysAllArgs & { memoId?: number | null }) =>
    [...memoKeys.details(rest), memoId] as const,
};

type commentKeysAllArgs = { projectId?: number; milestoneId?: number };
export const commentKeys = {
  all: (arg: commentKeysAllArgs) =>
    ["comments", ...Object.values(arg)] as const,
  list: (arg: commentKeysAllArgs) => [...commentKeys.all(arg), "list"] as const,
  details: (arg: commentKeysAllArgs) =>
    [...commentKeys.all(arg), "detail"] as const,
  detail: ({
    commentId,
    ...rest
  }: commentKeysAllArgs & { commentId: number }) =>
    [...commentKeys.details(rest), commentId] as const,
};

type exerciseKeysAllArgs = { userId?: number; year?: number; month?: number };
export const exerciseKeys = {
  default: ["exercises"],
  all: (arg: exerciseKeysAllArgs) =>
    [...exerciseKeys.default, ...Object.values(arg)] as const,
  list: (arg: exerciseKeysAllArgs) =>
    [...exerciseKeys.all(arg), "list"] as const,
  details: (arg: exerciseKeysAllArgs) =>
    [...exerciseKeys.all(arg), "detail"] as const,
  detail: (arg: exerciseKeysAllArgs, exerciseId?: number) => [
    ...exerciseKeys.details(arg),
    exerciseId,
  ],
};
