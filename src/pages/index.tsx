import React from "react";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";

import type { InferGetStaticPropsType, GetStaticProps } from "next";
import type { ISchema } from "loaders/schema";

import { Flex, Button, Text, Bold } from "@tremor/react";

import getSchema from "loaders/schema";

import Layout from "components/Layout";
import Head from "components/Head";
import ModelsList from "components/ModelsList";
import MetricsList from "components/MetricsList";
import ScenariosList from "components/ScenariosList";

export const getStaticProps: GetStaticProps<{
  logos: string[];
  schema: ISchema;
}> = async () => {
  const dirPath = path.join(process.cwd(), "public", "logos");
  const logos = fs.readdirSync(dirPath).map((f) => path.join("logos", f));
  const schema = await getSchema();

  return {
    props: {
      logos,
      schema,
    },
  };
};

export default function Home({
  logos,
  schema,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Head title="Home" />
      <Image
        src="/helm-logo.png"
        alt="HELM Logo"
        className="mx-auto"
        width={500}
        height={197}
      />
      <div className="max-w-[600px] mx-auto mt-16 mb-20">
        <Flex>
          <Button size="xl" className="px-10">
            Blog post
          </Button>
          <Button size="xl" className="px-10">
            Paper
          </Button>
          <Button size="xl" className="px-10">
            GitHub
          </Button>
        </Flex>
      </div>
      <div>
        <p>
          <Text>
            A language model takes in text and produces text:
            <Image
              src="/home/language-model-helm.png"
              alt="Language model diagram"
              className="mx-auto block"
              width={600}
              height={80}
            />
          </Text>
        </p>

        <p>
          <Text>
            Despite their simplicity, language models are increasingly
            functioning as the foundation for almost all language technologies
            from question answering to summarization. But their immense
            capabilities and risks are not well understood. Holistic Evaluation
            of Language Models (HELM) is a living benchmark that aims to improve
            the transparency of language models.
          </Text>
        </p>

        <ol className="mt-12">
          <li>
            <Text>
              <Bold>Broad coverage and recognition of incompleteness.</Bold> We
              define a taxonomy over the scenarios we would ideally like to
              evaluate, select scenarios and metrics to cover the space and make
              explicit what is missing.
            </Text>
            <Image
              src="/home/taxonomy-scenarios.png"
              alt="Taxonomy scenarios chart"
              className="mx-auto block"
              width={500}
              height={154}
            />
          </li>
          <li>
            <Text>
              <Bold>Multi-metric measurement.</Bold> Rather than focus on
              isolated metrics such as accuracy, we simultaneously measure
              multiple metrics (e.g., accuracy, robustness, calibration,
              efficiency) for each scenario, allowing analysis of tradeoffs.
            </Text>
            <Image
              src="/home/scenarios-by-metrics.png"
              alt="Scenarios by metrics table"
              className="mx-auto block"
              width={500}
              height={110}
            />
          </li>
          <li>
            <Text>
              <Bold>Standardization.</Bold> We evaluate all the models that we
              have access to on the same scenarios with the same adaptation
              strategy (e.g., prompting), allowing for controlled comparisons.
              Thanks to all the companies for providing API access to the
              limited-access and closed models and{" "}
              <Link target="_black" href="https://together.xyz/">
                Together
              </Link>{" "}
              for providing the infrastructure to run the open models.
            </Text>
            <Flex className="flex-wrap justify-center max-w-[1100px] mx-auto w-auto">
              {logos.map((logo, idx) => (
                <div className="w-24 h-24 flex items-center m-6" key={idx}>
                  <Image
                    src={logo}
                    alt="Logo"
                    className="mx-auto block"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }} // optional
                  />
                </div>
              ))}
            </Flex>
          </li>
        </ol>
      </div>
      <div>
        <Flex className="items-start">
          <ModelsList models={schema.models} />
          <ScenariosList runGroups={schema.run_groups} />
          <MetricsList
            metrics={schema.metrics}
            metricGroups={schema.metric_groups}
          />
        </Flex>
      </div>
    </Layout>
  );
}
