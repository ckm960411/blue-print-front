import { deleteCall } from "@/app/api/axios";

export const deleteLinkById = async (id: number) => {
  return await deleteCall(`link/${id}`);
};
