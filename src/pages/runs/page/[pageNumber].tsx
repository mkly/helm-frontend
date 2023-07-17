import React from "react";
import Link from "next/link";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";

import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@tremor/react";

import type { IRunSpecFiltered } from "loaders/runSpecs";
import type { ISummary } from "loaders/summary";
import getRunSpecs, { filterRunSpecs } from "loaders/runSpecs";
import getSummary from "loaders/summary";

import Layout from "components/Layout";
import Head from "components/Head";
import Pagination from "components/Pagination";
import PageTitle from "components/PageTitle";

const RESULTS_PER_PAGE = 200;

export const getStaticProps: GetStaticProps<{
  runSpecsFiltered: IRunSpecFiltered[];
  pageNumber: string;
  totalPages: number;
  summary: ISummary;
}> = async ({ params }) => {
  const pageNumber =
    params?.pageNumber !== undefined
      ? Array.isArray(params.pageNumber)
        ? params.pageNumber.join("")
        : params.pageNumber
      : "";

  const runSpecs = await getRunSpecs();
  const totalPages =
    (runSpecs.length - (runSpecs.length % RESULTS_PER_PAGE)) / RESULTS_PER_PAGE;

  const pageSlice = [
    (Number(pageNumber) - 1) * RESULTS_PER_PAGE,
    (Number(pageNumber) - 1) * RESULTS_PER_PAGE + RESULTS_PER_PAGE,
  ];

  const summary = await getSummary();

  return {
    props: {
      runSpecsFiltered: filterRunSpecs(runSpecs.slice(...pageSlice)),
      totalPages,
      pageNumber,
      summary,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const runSpecs = await getRunSpecs();

  const totalPages =
    (runSpecs.length - (runSpecs.length % RESULTS_PER_PAGE)) / RESULTS_PER_PAGE;
  const paths = [];
  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    paths.push({
      params: {
        pageNumber: String(pageNumber),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export default function RawRuns({
  runSpecsFiltered,
  pageNumber,
  totalPages,
  summary,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout summary={summary}>
      <Head title="Runs" />
      <PageTitle>Raw Runs</PageTitle>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Run</TableHeaderCell>
            <TableHeaderCell>Adaptation method</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {runSpecsFiltered.map((runSpec, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Link href={`/runs/${encodeURIComponent(runSpec.name)}`}>
                  {runSpec.name}
                </Link>
              </TableCell>
              <TableCell>{runSpec.adapter_spec.method}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        pageNumber={Number(pageNumber)}
        totalPages={Number(totalPages)}
      />
    </Layout>
  );
}
