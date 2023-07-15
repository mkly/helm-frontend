import React from "react";
import Link from "next/link";

import { Icon, Title } from "@tremor/react";
import { InformationCircleIcon } from "@heroicons/react/outline";

import {
  getRunGroupTaskBucketsFromRunGroups,
  getTotalFromRunGroupTaskBuckets,
} from "loaders/schema";

import type { IRunGroup } from "loaders/schema";

interface Props {
  runGroups: IRunGroup[];
}

export default function ScenariosList({ runGroups }: Props) {
  const runGroupsActive = runGroups.filter((runGroup) => !runGroup.todo);
  const scenarioBuckets = getRunGroupTaskBucketsFromRunGroups(runGroupsActive);

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
              <li key={idx}>
                <Icon
                  color="zinc"
                  size="sm"
                  icon={InformationCircleIcon}
                  tooltip={scenario.description}
                />{" "}
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
