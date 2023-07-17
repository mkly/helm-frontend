import React from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

import {
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  Title,
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
import type { IGroupTable } from "loaders/groupsTable";
import Cell from "components/Cell";

export const getStaticProps: GetStaticProps<{
  groupsTable: IGroupTable[];
}> = async () => {
  const groupsTable = await getGroupsTable();

  return { props: { groupsTable } };
};

export default function Results({
  groupsTable,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Head title="Results" />
      <Flex>
        <Title>Groups</Title>
        <a
          className="flex space-between block items-center"
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
