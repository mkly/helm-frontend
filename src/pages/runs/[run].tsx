import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Title, Subtitle, Table, TableBody } from "@tremor/react";
import { Grid, Col, Card, List, ListItem } from "@tremor/react";
import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Divider,
} from "@tremor/react";
import { ClipLoader } from "react-spinners";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";

import type { IStatFiltered } from "loaders/stats";
import type { IRunGroup } from "loaders/schema";
import type { IRunSpec } from "loaders/runSpecs";
import type { IInstanceFiltered } from "loaders/instances";
import type { IDisplayPredictionMap } from "loaders/displayPredictions";
import type { IDisplayRequestMap } from "loaders/displayRequests";
import type { ISummary } from "loaders/summary";
import getSchema from "loaders/schema";
import getRunSpecs from "loaders/runSpecs";
import getStats, { filterStats } from "loaders/stats";
import getInstances, { filterInstances } from "loaders/instances";
import getSummary from "loaders/summary";
import { getDisplayPredictionMap } from "loaders/displayPredictions";
import { getDisplayRequestMap } from "loaders/displayRequests";

import Layout from "components/Layout";
import Head from "components/Head";
import DictRows from "components/DictRows";
import Stat from "components/Stat";
import InstanceRow from "components/InstanceRow";
import PageTitle from "components/PageTitle";

export const getStaticPaths: GetStaticPaths = async () => {
  const runSpecs = await getRunSpecs();
  const paths = runSpecs.map(({ name }) => ({
    params: {
      run: name,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  runName: string;
  summary: ISummary;
}> = async ({ params }) => {
  const runName = (() => {
    if (params?.run === undefined) {
      return "";
    }
    if (Array.isArray(params.run)) {
      return params.run[0];
    }

    return params.run;
  })();

  const summary = await getSummary();

  return {
    props: {
      runName,
      summary,
    },
  };
};

/**
 * @FIXME We just grab the first run spect adapter_spec and ouput it
 * This is not what currently happens
 * @SEE https://github.com/stanford-crfm/helm/blob/cffe38eb2c814d054c778064859b6e1551e5e106/src/helm/benchmark/static/benchmarking.js#L708-L709
 * Should at some point understand what is really going on here
 */
export default function Run({
  runName,
  summary,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [state, setState] = useState<
    | {
        statsFiltered: IStatFiltered[];
        runSpec: IRunSpec;
        instancesFiltered: IInstanceFiltered[];
        displayPredictionMap: IDisplayPredictionMap;
        displayRequestMap: IDisplayRequestMap;
        group: IRunGroup | undefined;
        runName: string;
      }
    | undefined
  >();

  useEffect(() => {
    if (!runName) {
      return;
    }

    const fetchData = async () => {
      const schema = await getSchema();
      const statsFiltered = filterStats(await getStats(runName));
      const instancesFiltered = filterInstances(await getInstances(runName));
      const displayPredictionMap = await getDisplayPredictionMap(runName);
      const displayRequestMap = await getDisplayRequestMap(runName);
      const runSpecs = await getRunSpecs();
      const group: IRunGroup | undefined = schema.run_groups.find(
        (run_group) => run_group.name === runSpecs[0].groups[0],
      );
      const runSpec = runSpecs[0];

      setState({
        statsFiltered,
        runSpec,
        instancesFiltered,
        displayPredictionMap,
        displayRequestMap,
        group,
        runName,
      });
    };

    fetchData();
  }, [runName]);

  if (!state) {
    return <ClipLoader size={100} className="my-36 mx-auto !block" />;
  }

  return (
    <Layout summary={summary}>
      <Head title={`Run: ${state.runName}`} />
      <PageTitle>{state.runName}</PageTitle>
      <Grid className="mb-16" numItems={2}>
        <Col numColSpan={1} className="p-4">
          <Title>{state.group?.display_name || ""}</Title>
          <Subtitle>
            <ReactMarkdown>{state.group?.description || ""}</ReactMarkdown>
          </Subtitle>
          <List className="mt-8">
            <ListItem>
              <b>Model:</b> {state.runSpec.adapter_spec.model || ""}
            </ListItem>
            <ListItem>
              <b>Task:</b> {state.runSpec.scenario_spec.args.task || ""}
            </ListItem>
            <ListItem>
              <b>Run:</b> {state.runName}
            </ListItem>
          </List>
        </Col>
        <Col numColSpan={1} className="p-4">
          <Card>
            <List>
              <Title>Adapter specifications</Title>
              <DictRows dict={(state.runSpec || {}).adapter_spec || {}} />
            </List>
          </Card>
        </Col>
      </Grid>

      <TabGroup>
        <TabList>
          <Tab>Instances + Predictions</Tab>
          <Tab>All metrics</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {state.instancesFiltered.map((instance, idx) => (
              <>
                <InstanceRow
                  key={idx}
                  instance={instance}
                  predictions={state.displayPredictionMap[instance.id]}
                  requests={state.displayRequestMap[instance.id]}
                />
                <Divider />
              </>
            ))}
          </TabPanel>
          <TabPanel>
            <Table>
              <TableBody>
                {state?.statsFiltered.map((stat, idx) => (
                  <Stat key={idx} stat={stat} />
                ))}
              </TableBody>
            </Table>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Layout>
  );
}
