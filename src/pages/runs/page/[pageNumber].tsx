import React from "react";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";

import {
  Title,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@tremor/react";

import type { IRunSpecFiltered } from "loaders/runSpecs";
import getRunSpecs, { filterRunSpecs } from "loaders/runSpecs";

import Layout from "components/Layout";
import Head from "components/Head";
import Pagination from "components/Pagination";

const RESULTS_PER_PAGE = 200;

export const getStaticProps: GetStaticProps<{
  runSpecsFiltered: IRunSpecFiltered[];
  pageNumber: string;
  totalPages: number;
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

  return {
    props: {
      runSpecsFiltered: filterRunSpecs(runSpecs.slice(...pageSlice)),
      totalPages,
      pageNumber,
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
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Head title="Runs" />
      <Title>Runs</Title>

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
                <a href={`/runs/${encodeURIComponent(runSpec.name)}`}>
                  {runSpec.name}
                </a>
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
      <div>
        {runSpecsFiltered.length} result
        {`${runSpecsFiltered.length === 1 ? "" : "s"}`}
      </div>
      <div>{totalPages} pages</div>
    </Layout>
  );
}
