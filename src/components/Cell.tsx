import React from "react";
import ReactMarkdown from "react-markdown";

import { TableCell } from "@tremor/react";
import type { IRow } from "loaders/groupsTable";

import formatResult from "utils/formatResult";

interface Props {
  cell: IRow;
}

const convertHrefLink = function (link: string = ""): string {
  const match = link.match(/group=([^&]+)/);

  if (match === null || match[1] === undefined) {
    return "";
  }

  return `/groups/${match[1]}`;
};

function HrefCell({ cell }: Props) {
  return (
    <TableCell>
      <a href={convertHrefLink(cell.href)}>{cell.value}</a>
    </TableCell>
  );
}

function DescriptionCell({ cell }: Props) {
  return (
    <TableCell>
      <ReactMarkdown>
        {cell.description === undefined ? "" : cell.description}
      </ReactMarkdown>
    </TableCell>
  );
}

function ValueCell({ cell }: Props) {
  return <TableCell>{formatResult(cell.value)}</TableCell>;
}

export default function Cell({ cell }: Props) {
  if (cell.href !== undefined) {
    return <HrefCell cell={cell} />;
  }

  if (cell.value !== undefined) {
    return <ValueCell cell={cell} />;
  }

  if (cell.description !== undefined) {
    return <DescriptionCell cell={cell} />;
  }

  return <TableCell></TableCell>;
}
