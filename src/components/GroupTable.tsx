import React from "react";

import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableHeaderCell,
} from "@tremor/react";

import formatResult from "utils/formatResult";
import type { IGroupTable } from "loaders/groupsTable";

interface Props {
  groupTable: IGroupTable;
}

export default function GroupTable({ groupTable }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {groupTable.header.map(({ value }, idx) => (
            <TableHeaderCell key={idx}>{value}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {groupTable.rows.map((row, idx) => (
          <TableRow key={idx}>
            {row.map(({ value }, idx) => (
              <td key={idx}>
                {value !== undefined ? formatResult(value) : "-"}
              </td>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
