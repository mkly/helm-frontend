import React from "react";
import ReactMarkdown from "react-markdown";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

import {
  Title,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Badge,
} from "@tremor/react";

import Head from "components/Head";
import getSchema from "loaders/schema";
import type { ISchema } from "loaders/schema";
import getSummary from "loaders/summary";
import type { ISummary } from "loaders/summary";
import Layout from "components/Layout";
import ModelLogo from "components/ModelLogo";

export const getStaticProps: GetStaticProps<{
  schema: ISchema;
  summary: ISummary;
}> = async () => {
  const schema = await getSchema();
  const summary = await getSummary();

  return { props: { schema, summary } };
};

export default function Models({
  schema,
  summary,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout summary={summary}>
      <Head title="Models" />
      <Title>Models</Title>
      <div className="w-full">
        <table className="tremor-Table-table table-auto w-full tabular-nums text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          <TableHead>
            <TableRow>
              <TableHeaderCell className="static">Creator</TableHeaderCell>
              <TableHeaderCell className="static">Model</TableHeaderCell>
              <TableHeaderCell className="static">Description</TableHeaderCell>
              <TableHeaderCell className="static">Access</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schema.models.map((model, idx: number) => (
              <TableRow key={idx}>
                <TableCell className="text-center">
                  <ModelLogo modelOrganization={model.creator_organization} />
                </TableCell>
                <TableCell>
                  <p className="text-lg uppercase">{model.display_name}</p>
                  <p>{model.name}</p>
                </TableCell>
                <TableCell className="whitespace-normal">
                  <ReactMarkdown>{model.description}</ReactMarkdown>
                </TableCell>
                <TableCell>
                  {(() => {
                    switch (model.access) {
                      case "limited":
                        return <Badge color="yellow">{model.access}</Badge>;
                      case "closed":
                        return <Badge color="red">{model.access}</Badge>;
                      case "open":
                        return <Badge color="green">{model.access}</Badge>;
                    }
                  })()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </table>
      </div>
    </Layout>
  );
}
