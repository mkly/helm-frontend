import React from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
} from "@tremor/react";
import {
  Title,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@tremor/react";

import Layout from "components/Layout";
import Head from "components/Head";
import getGroupsTable from "loaders/groupsTable";
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
      <Title>Groups</Title>
      <TabGroup>
        <TabList>
          {groupsTable.map((groupTable, idx) => (
            <Tab key={idx}>{groupTable.title}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {groupsTable.map((groupTable, idx) => (
            <TabPanel key={idx}>
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
                      {row.map((cell) => (
                        <Cell key={cell.value} cell={cell} />
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </Layout>
  );
}
