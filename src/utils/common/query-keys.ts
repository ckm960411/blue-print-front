export const GET_ALL_MEMOS = "getAllMemos";
const getAllMemos = (...args: any[]) => [GET_ALL_MEMOS, ...args];

const getAllTasks = (...args: any[]) => ["get-all-tasks", ...args];

const getThisMonthTasks = (...args: any[]) => ["get-this-month-tasks", ...args];

const getAllMilestones = (...args: any[]) => ["get-all-milestones", ...args];

const getMilestoneById = (id: number) => ["get-milestone-by-id", id];

const getAllProjects = (...args: any[]) => ["get-all-projects", ...args];

const getAllComments = (...args: any[]) => ["get-all-comments", args];

export const QueryKeys = {
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
