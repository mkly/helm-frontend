import React, { useState } from "react";

import { BarChart } from "@tremor/react";
import {
  Bar,
  CartesianGrid,
  Legend as ReChartsLegend,
  BarChart as ReChartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { IGroupTable } from "loaders/groupsTable";

import Legend from "components/Legend";

const colors = [
  "blue",
  "cyan",
  "sky",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "pink",
  "rose",
];

interface BarChartData {
  [key: string]: string | number | undefined;
}

interface Props {
  groupTable: IGroupTable;
}

export default function GroupBarChart({ groupTable }: Props) {
  const [activeCategories, setActiveCategories] = useState<Map<string, true>>(
    new Map(
      groupTable.header.slice(1).map(({ value }) => [String(value), true]),
    ),
  );

  const data = groupTable.rows.map((row) => ({
    ...row.slice(1).reduce((acc, cur, idx) => {
      acc[groupTable.header[idx + 1].value] = isNaN(Number(cur.value))
        ? 0
        : cur.value;

      return acc;
    }, {} as BarChartData),
    ...{ name: row[0].value },
  }));

  const handleLegendItemClick = (category: string) => {
    if (activeCategories.has(category)) {
      activeCategories.delete(category);
    } else {
      activeCategories.set(category, true);
    }
    setActiveCategories(new Map(activeCategories));
  };

  const height = Math.min(
    Math.max(activeCategories.size || 1, 2) *
      (groupTable.rows.length || 1) *
      20,
    4000,
  );

  return (
    <div style={{ height }} className={`w-full`}>
      <Legend
        categories={groupTable.header.slice(1).map(({ value }) => value)}
        activeCategories={activeCategories}
        onClick={handleLegendItemClick}
      />
      <ResponsiveContainer className="h-full w-full">
        <ReChartsBarChart layout="vertical" data={data}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={140} />
          <Tooltip />
          {groupTable.header.slice(1).map(({ value }, idx) => {
            if (!activeCategories.has(value)) {
              return null;
            }

            return (
              <Bar
                type="linear"
                fill=""
                className={`fill-${colors[idx]}-500`}
                dataKey={value}
                key={value}
                name={value}
                isAnimationActive={true}
                animationDuration={900}
              />
            );
          })}
        </ReChartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
