import React from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

import {
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Icon,
} from "@tremor/react";
import { CloudDownloadIcon } from "@heroicons/react/outline";

import Layout from "components/Layout";
import Head from "components/Head";
import getGroupsTable, { getGroupsTableJsonUrl } from "loaders/groupsTable";
import getSummary from "loaders/summary";
import type { IGroupTable } from "loaders/groupsTable";
import type { ISummary } from "loaders/summary";
import Cell from "components/Cell";
import PageTitle from "components/PageTitle";

export const getStaticProps: GetStaticProps<{
  groupsTable: IGroupTable[];
  summary: ISummary;
}> = async () => {
  const groupsTable = await getGroupsTable();
  const summary = await getSummary();

  return { props: { groupsTable, summary } };
};

export default function Results({
  groupsTable,
  summary,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout summary={summary}>
      <Head title="Results" />
      <Flex>
        <PageTitle>Groups</PageTitle>
        <a
          className="flex space-between items-center self-end"
          href={getGroupsTableJsonUrl()}
          download="true"
          target="_blank"
        >
          <Icon icon={CloudDownloadIcon} size="sm" /> JSON
        </a>
      </Flex>
      <TabGroup>
        <TabList>
          {groupsTable.map((groupTable, idx) => (
            <Tab key={idx}>{groupTable.title}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {groupsTable.map((groupTable, idx) => (
            <TabPanel key={idx}>
              <div className="w-full">
                <table className="tremor-Table-table table-auto w-full tabular-nums text-tremor-default text-tremor-content dark:text-dark-tremor-content">
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
                        <Cell
                          className="text-lg whitespace-normal"
                          key={row[0].value}
                          cell={row[0]}
                        />
                        {row.slice(1).map((cell) => (
                          <Cell
                            className="whitespace-normal"
                            key={cell.value}
                            cell={cell}
                          />
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </table>
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </Layout>
  );
}
