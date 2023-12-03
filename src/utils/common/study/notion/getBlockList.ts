import { getNotionBlockList } from "@/utils/services/notion";

export const getBlockList = async (
  blockIds: string[],
  options?: { start_cursor?: string; page_size?: number },
) => {
  if (blockIds.length === 0)
    return {
      blocks: [],
      next_cursor: null,
      hasMore: false,
    };

  try {
    const blockList = await Promise.all(
      blockIds.map((blockId) =>
        getNotionBlockList(blockId, {
          start_cursor: options?.start_cursor,
          page_size: 10,
        }),
      ),
    );
    let nextCursor: string | null = null;
    let hasMore: boolean = false;
    const blocks = blockList.flatMap(
      ({ results, next_cursor, has_more }, i) => {
        if (i === blockList.length - 1) {
          nextCursor = next_cursor;
          hasMore = has_more;
        }
        return results;
      },
    );
    const blocksHaveChildren = blocks.filter(
      ({ has_children, type }) => has_children && type !== "child_page",
    );
    const blockIdsHaveChildren = blocksHaveChildren.map(({ id }) => id);

    if (blockIdsHaveChildren.length > 0) {
      const { blocks: childrenBlocks } =
        await getBlockList(blockIdsHaveChildren);
      if (childrenBlocks.length > 0) {
        childrenBlocks.forEach((block) => {
          if ("block_id" in block.parent) {
            const { block_id } = block.parent;
            const found = blocksHaveChildren.find((b) => b.id === block_id);
            if (found) {
              found.children = [...(found?.children ?? []), block];
            }
          }
        });
      }
    }
    return { blocks, next_cursor: nextCursor, hasMore };
  } catch (error) {
    console.error(error);
    return {
      blocks: [],
      next_cursor: null,
      hasMore: false,
    };
  }
};
