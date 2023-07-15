import React, { useState } from "react";

import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableHeaderCell,
  TableCell,
  Button,
} from "@tremor/react";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";

import formatResult from "utils/formatResult";
import type { IGroupTable } from "loaders/groupsTable";

interface Props {
  groupTable: IGroupTable;
}

export default function GroupTable({ groupTable }: Props) {
  const [rows, setRows] = useState([...groupTable.rows]);
  const [sortedRowIdx, setSortedRowIdx] = useState<number | undefined>();

  const sortTable = (idx: number, direction: -1 | 1 = 1) => {
    setSortedRowIdx(idx);
    setRows([
      ...groupTable.rows.sort((a, b) => {
        if (a[idx].value === undefined) {
          return 1;
        }
        if (b[idx].value === undefined) {
          return -1;
        }
        return (
          String(b[idx].value).localeCompare(String(a[idx].value)) * direction
        );
      }),
    ]);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {groupTable.header.map(({ value }, idx) => (
            <TableHeaderCell
              key={idx}
              className={idx === sortedRowIdx ? "bg-slate-200" : ""}
            >
              {value}{" "}
              <Button
                className="ml-4"
                icon={ChevronUpIcon}
                variant="light"
                onClick={() => sortTable(idx)}
              />
              <Button
                icon={ChevronDownIcon}
                variant="light"
                onClick={() => sortTable(idx, -1)}
              />
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow key={idx}>
            {row.map(({ value }, idx) => (
              <TableCell
                key={idx}
                className={idx === sortedRowIdx ? "bg-slate-100" : ""}
              >
                {value !== undefined ? formatResult(value) : "-"}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
