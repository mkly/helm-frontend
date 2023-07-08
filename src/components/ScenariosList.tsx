import React from "react";
import Link from "next/link";

import { Title } from "@tremor/react";

import {
  getRunGroupTaskBucketsFromRunGroups,
  getTotalFromRunGroupTaskBuckets,
} from "loaders/schema";

import type { IRunGroup } from "loaders/schema";

interface Props {
  runGroups: IRunGroup[];
}

export default function ScenariosList({ runGroups }: Props) {
  const scenarioBuckets = getRunGroupTaskBucketsFromRunGroups(runGroups);

  return (
    <ul>
      <Title>
        {getTotalFromRunGroupTaskBuckets(scenarioBuckets)} Scenarios
      </Title>

      {Object.keys(scenarioBuckets).map((bucket, idx) => (
        <li key={idx}>
          <ul>
            <Title>
              {bucket
                .replace("_", " ")
                .split(" ")
                .map((l) => l.charAt(0).toUpperCase() + l.slice(1))
                .join(" ")}
            </Title>
            {scenarioBuckets[bucket].map((scenario, idx) => (
              <li className="ml-4" key={idx}>
                <Link href={`/groups/${scenario.name}`}>
                  {scenario.display_name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
