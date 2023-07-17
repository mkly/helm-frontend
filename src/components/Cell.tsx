import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { TableCell } from "@tremor/react";
import type { IRow } from "loaders/groupsTable";

import formatResult from "utils/formatResult";

interface Props {
  cell: IRow;
  className?: any;
}

const convertHrefLink = function (link: string = ""): string {
  const match = link.match(/group=([^&]+)/);

  if (match === null || match[1] === undefined) {
    return "";
  }

  return `/groups/${match[1]}`;
};

function HrefCell({ cell, ...props }: Props) {
  return (
    <TableCell {...props}>
      <Link href={convertHrefLink(cell.href)}>{cell.value}</Link>
    </TableCell>
  );
}

function DescriptionCell({ cell, ...props }: Props) {
  return (
    <TableCell {...props}>
      <ReactMarkdown>
        {cell.description === undefined ? "" : cell.description}
      </ReactMarkdown>
    </TableCell>
  );
}

function ValueCell({ cell, ...props }: Props) {
  return <TableCell {...props}>{formatResult(cell.value)}</TableCell>;
}

export default function Cell({ cell, ...props }: Props) {
  if (cell.href !== undefined) {
    return <HrefCell cell={cell} {...props} />;
  }

  if (cell.value !== undefined) {
    return <ValueCell cell={cell} {...props} />;
  }

  if (cell.description !== undefined) {
    return <DescriptionCell cell={cell} {...props} />;
  }

  return <TableCell></TableCell>;
}
