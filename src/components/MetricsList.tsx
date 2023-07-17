import React from "react";

import { InformationCircleIcon } from "@heroicons/react/outline";
import { Icon, Title } from "@tremor/react";

import { IMetric, IMetricGroup } from "loaders/schema";

interface Props {
  metrics: IMetric[];
  metricGroups: IMetricGroup[];
}

export default function MetricList({ metrics, metricGroups }: Props) {
  let remainingMetrics = [...metrics];

  return (
    <ul>
      <Title>{metrics.length} Metrics</Title>
      {metricGroups.map((metricGroup, idx) => (
        <li key={idx}>
          <ul>
            {metrics.filter((metric) =>
              metricGroup.metrics.some((m) => m.name === metric.name),
            ).length > 0 ? (
              <Title>
                {metricGroup.display_name} ({metricGroup.name})
              </Title>
            ) : null}
            {metrics
              .filter((metric) =>
                metricGroup.metrics.some((m) => m.name === metric.name),
              )
              .map((metric, idx) => {
                remainingMetrics = remainingMetrics.filter(
                  (rm) => rm.name !== metric.name,
                );
                return (
                  <li key={idx}>
                    <Icon
                      color="zinc"
                      size="sm"
                      icon={InformationCircleIcon}
                      tooltip={metric.description}
                    />{" "}
                    {metric.display_name}
                  </li>
                );
              })}
          </ul>
        </li>
      ))}
      <li>
        <ul>
          <Title>No Metric Group</Title>
          {remainingMetrics.map((metric, idx) => (
            <li key={idx}>
              <Icon
                color="zinc"
                size="sm"
                icon={InformationCircleIcon}
                tooltip={metric.description}
              />{" "}
              {metric.display_name}
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
}
