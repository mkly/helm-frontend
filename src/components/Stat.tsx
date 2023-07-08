import React from "react";

import { TableCell, TableRow } from "@tremor/react";

import type { IStatFiltered } from "loaders/stats";

import formatResult from "utils/formatResult";

interface IStatProps {
  stat: IStatFiltered;
}

export default function Stat({ stat }: IStatProps) {
  const value = stat.mean !== undefined ? formatResult(stat.mean, 3) : "";
  const perturbation =
    stat.name.perturbation !== undefined
      ? ` on ${stat.name.perturbation.name} `
      : ` on ${stat.name.split} `;

  return (
    <TableRow>
      <TableCell>
        <b>{stat.name.name}</b>
        {perturbation}
      </TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  );
}
