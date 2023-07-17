import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";

import { TabGroup, TabList, TabPanels, TabPanel } from "@tremor/react";
import { List, ListItem } from "@tremor/react";
import { Grid, Col, Card, Title, Subtitle, Button } from "@tremor/react";

import type { IRunGroup } from "loaders/schema";
import type { IGroupTable } from "loaders/groupsTable";
import type { ISummary } from "loaders/summary";
import getSchema from "loaders/schema";
import { getGroupTablesByName } from "loaders/groupsTable";
import getSummary from "loaders/summary";

import Layout from "components/Layout";
import Head from "components/Head";
import GroupTable from "components/GroupTable";
import GroupBarChart from "components/GroupBarChart";
import GroupHeader from "components/GroupHeader";

export const getStaticProps: GetStaticProps<{
  groupTables: IGroupTable[];
  group: IRunGroup;
  summary: ISummary;
}> = async ({ params }) => {
  const groupName = params?.group !== undefined ? params.group : "";
  const schema = await getSchema();
  const group: IRunGroup | undefined = schema.run_groups.find(
    (run_group) => run_group.name === groupName,
  );
  const groupTables =
    group !== undefined
      ? await getGroupTablesByName(group.name)
      : ([] as IGroupTable[]);
  const summary = await getSummary();

  return {
    props: {
      groupTables,
      summary,
      group:
        group !== undefined
          ? group
          : {
              name: "NOT_FOUND",
              display_name: "NOT_FOUND",
              description: "NOT_FOUND",
            },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const schema = await getSchema();
  const paths = schema.run_groups.map((runGroup) => ({
    params: {
      group: runGroup.name,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default function Group({
  groupTables,
  group,
  summary,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [showBarChart, setShowBarChart] = useState(true);

  return (
    <Layout summary={summary}>
      <Head title={`Group: ${group.display_name}`} />
      <Grid className="mb-16" numItems={2}>
        <Col numColSpan={1}>
          <Title>{group.display_name}</Title>
          <Subtitle>
            <ReactMarkdown>{group.description}</ReactMarkdown>
          </Subtitle>
        </Col>
        <Col numColSpan={1}>
          {group.taxonomy !== undefined ? (
            <Card>
              <List>
                <ListItem>
                  <b>Task:</b> {group.taxonomy.task}
                </ListItem>
                <ListItem>
                  <b>What:</b> {group.taxonomy.what}
                </ListItem>
                <ListItem>
                  <b>When:</b> {group.taxonomy.when}
                </ListItem>
                <ListItem>
                  <b>Who:</b> {group.taxonomy.who}
                </ListItem>
                <ListItem>
                  <b>Language:</b> {group.taxonomy.language}
                </ListItem>
              </List>
            </Card>
          ) : null}
        </Col>
      </Grid>
      {groupTables.length > 0 ? (
        <TabGroup>
          <TabList>
            <GroupHeader groupTables={groupTables} />
            <div className="flex !ml-auto">
              <Button
                variant="light"
                size="xs"
                onClick={() => setShowBarChart(!showBarChart)}
              >
                {showBarChart ? "Show Table" : "Show Bar Chart"}
              </Button>
            </div>
          </TabList>
          <TabPanels>
            {groupTables.map((groupTable, idx) => {
              return (
                <TabPanel key={idx}>
                  {showBarChart ? (
                    <GroupBarChart groupTable={groupTable} />
                  ) : (
                    <GroupTable groupTable={groupTable} />
                  )}
                </TabPanel>
              );
            })}
          </TabPanels>
        </TabGroup>
      ) : null}
    </Layout>
  );
}
