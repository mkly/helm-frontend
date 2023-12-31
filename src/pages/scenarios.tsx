import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";

import type { IRunGroup } from "loaders/schema";
import type { ISummary } from "loaders/summary";

import PageTitle from "components/PageTitle";
import Layout from "components/Layout";
import Head from "components/Head";
import getSchema from "loaders/schema";
import getSummary from "loaders/summary";

export const getStaticProps: GetStaticProps<{
  runGroups: IRunGroup[];
  summary: ISummary;
}> = async () => {
  const { run_groups: runGroups } = await getSchema();
  const summary = await getSummary();

  return {
    props: {
      summary,
      runGroups: runGroups.filter((runGroup) => !runGroup.todo),
    },
  };
};

export default function Scenarios({
  runGroups,
  summary,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout summary={summary}>
      <Head title="Scenarios" />
      <PageTitle>Scenarios</PageTitle>
      <div className="w-full">
        <table className="tremor-Table-table table-auto w-full tabular-nums text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          <TableHead>
            <TableRow>
              <TableHeaderCell className="static">Scenario</TableHeaderCell>
              <TableHeaderCell className="static">Task</TableHeaderCell>
              <TableHeaderCell className="static">What</TableHeaderCell>
              <TableHeaderCell className="static">Who</TableHeaderCell>
              <TableHeaderCell className="static">When</TableHeaderCell>
              <TableHeaderCell className="static">Language</TableHeaderCell>
              <TableHeaderCell className="static">Description</TableHeaderCell>
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
                      <Link
                        className="text-lg"
                        href={`/groups/${run_group.name}`}
                      >
                        {run_group.display_name}
                      </Link>
                    </p>
                    <p>{run_group.name}</p>
                  </TableCell>
                  {run_group.taxonomy !== undefined ? (
                    <>
                      <TableCell className="whitespace-normal">
                        {run_group.taxonomy.task}
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        {run_group.taxonomy.what}
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        {run_group.taxonomy.who}
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        {run_group.taxonomy.when}
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        {run_group.taxonomy.language}
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        <ReactMarkdown>{run_group.description}</ReactMarkdown>
                      </TableCell>
                    </>
                  ) : (
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
        </table>
      </div>
    </Layout>
  );
}
