import React from "react";

import { Tab } from "@tremor/react";

import type { IGroupTable } from "loaders/groupsTable";

interface Props {
  groupTables: IGroupTable[];
}

export default function GroupHeader({ groupTables }: Props) {
  return (
    <>
      {groupTables.map((groupTable, idx) =>
        groupTable.title !== undefined && groupTable.title.length > 0 ? (
          <Tab key={idx}>{groupTable.title}</Tab>
        ) : (
          <span key={idx} />
        ),
      )}
    </>
  );
}
