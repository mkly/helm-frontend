import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react";

import type { IRunGroup } from "loaders/schema";

import Layout from "components/Layout";
import Head from "components/Head";
import getSchema from "loaders/schema";

export const getStaticProps: GetStaticProps<{
  runGroups: IRunGroup[];
}> = async () => {
  const { run_groups: runGroups } = await getSchema();

  return {
    props: {
      runGroups: runGroups.filter((runGroup) => !runGroup.todo),
    },
  };
};

export default function Scenarios({
  runGroups,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Head title="Scenarios" />
      <Title>Scenarios</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Scenario</TableHeaderCell>
            <TableHeaderCell>Task</TableHeaderCell>
            <TableHeaderCell>What</TableHeaderCell>
            <TableHeaderCell>Who</TableHeaderCell>
            <TableHeaderCell>When</TableHeaderCell>
            <TableHeaderCell>Language</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {runGroups.map((run_group, idx) => {
            if (run_group.category) {
              return null;
            }
            return (
              <TableRow key={idx}>
                <TableCell>
                  <p>
                    <Link href={`/groups/${run_group.name}`}>
                      {run_group.display_name}
                    </Link>
                  </p>
                  <p>{run_group.name}</p>
                </TableCell>
                {run_group.taxonomy !== undefined
                  ? (
                    <>
                      <TableCell>{run_group.taxonomy.task}</TableCell>
                      <TableCell>{run_group.taxonomy.what}</TableCell>
                      <TableCell>{run_group.taxonomy.who}</TableCell>
                      <TableCell>{run_group.taxonomy.when}</TableCell>
                      <TableCell>{run_group.taxonomy.language}</TableCell>
                      <TableCell>
                        <ReactMarkdown>{run_group.description}</ReactMarkdown>
                      </TableCell>
                    </>
                  )
                  : (
                    <>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <ReactMarkdown>{run_group.description}</ReactMarkdown>
                      </TableCell>
                    </>
                  )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Layout>
  );
}
