import React from "react";
import ReactMarkdown from "react-markdown";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

import {
  Title,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@tremor/react";

import Head from "components/Head";
import getSchema from "loaders/schema";
import type { ISchema } from "loaders/schema";
import Layout from "components/Layout";

export const getStaticProps: GetStaticProps<{
  schema: ISchema;
}> = async () => {
  const schema = await getSchema();

  return { props: { schema } };
};

export default function Models({
  schema,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Head title="Models" />
      <Title>Models</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Creator</TableHeaderCell>
            <TableHeaderCell>Model</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Access</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schema.models.map((model, idx: number) => (
            <TableRow key={idx}>
              <TableCell>{model.creator_organization}</TableCell>
              <TableCell>
                <p>
                  {model.name} {model.display_name}
                </p>
                <p>{model.name}</p>
              </TableCell>
              <TableCell>
                <ReactMarkdown>{model.description}</ReactMarkdown>
              </TableCell>
              <TableCell>{model.access}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  );
}
