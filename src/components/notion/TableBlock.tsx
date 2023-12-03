import React from "react";
import { Table, TableContainer, Tbody, Th, Tr } from "@chakra-ui/react";

import { Block } from "@/utils/types/notion";
import RichText from "@/components/notion/RichText";

interface TableBlockProps {
  block: Block;
}
export default function TableBlock({ block }: TableBlockProps) {
  [];
  const rows = block.children ?? [];

  return (
    <TableContainer minWidth={800}>
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
  );
}
