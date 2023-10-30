import React, { useEffect, useState } from "react";
import { Table, TableContainer, Tbody, Th, Tr } from "@chakra-ui/react";
import { getNotionBlockList } from "@/utils/services/notion";
import { Block } from "@/utils/types/notion";
import RichText from "./RichText";

interface TableBlockProps {
  block: Block;
}
export default function TableBlock({ block }: TableBlockProps) {
  const [rows, setRows] = useState<Block[]>([]);

  useEffect(() => {
    getNotionBlockList(block.id)
      .then((data) => setRows(data.results))
      .catch(console.error);
  }, []);

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
