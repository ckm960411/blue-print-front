import { getNotionBlockList } from "@/utils/services/notion";
import { Block, BlockType } from "@/utils/types/notion";
import { Table, TableContainer, Tbody, Th, Tr } from "@chakra-ui/react";
import React from "react";
import RichText from "./RichText";

interface TableBlockProps {
  block: Block;
}
export default async function TableBlock({ block }: TableBlockProps) {
  const { results: rows } = await getNotionBlockList(block.id);

  return (
    <div className="my-8px rounded-10px border border-gray-200 px-8px">
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            {rows.map((tr) => (
              <Tr key={tr.id}>
                {tr.table_row.cells.map((cell, i) => (
                  <Th key={i}>
                    <RichText richText={cell} />
                  </Th>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
