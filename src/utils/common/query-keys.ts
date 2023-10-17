export const GET_ALL_MEMOS = "getAllMemos";
const getAllMemos = (showChecked?: boolean) => [GET_ALL_MEMOS, showChecked];

export const QueryKeys = {
  // MEMO
  getAllMemos,
};
