import { getNotionBlockList } from "@/utils/services/notion";
import { useQuery } from "react-query";

export const useNotionBlockList = (blockId: string) => {
  const queryResult = useQuery(
    ["get-notion-block-list", blockId],
    () => getNotionBlockList(blockId),
    { onError: console.error },
  );

  return queryResult;
};
