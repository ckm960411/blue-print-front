"use client";

import { getNotionBlockList } from "@/utils/services/notion";
import { Block } from "@/utils/types/notion";
import { Table, TableContainer, Tbody, Th, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import RichText from "./RichText";
import { useWindowSize } from "usehooks-ts";
import { useMediaQuery } from "react-responsive";

interface TableBlockProps {
  block: Block;
}
export default function TableBlock({ block }: TableBlockProps) {
  const { width } = useWindowSize();
  const UNDER_480PX = useMediaQuery({ query: "(max-width: 479px)" });
  const [rows, setRows] = useState<Block[]>([]);
  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    getNotionBlockList(block.id)
      .then(({ results }) => setRows(results))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setMaxWidth(width - 32 - (UNDER_480PX ? 0 : 88));
  }, [width]);

  return (
    <div
      className="my-8px overflow-x-auto rounded-10px border border-gray-200 px-8px"
      style={{ width: maxWidth }}
    >
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
    </div>
  );
}
