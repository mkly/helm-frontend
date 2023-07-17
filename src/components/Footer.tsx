import React from "react";

import { Text } from "@tremor/react";

import type { ISummary } from "loaders/summary";

export default function Footer({ summary }: { summary: ISummary }) {
  if (!summary.suite || !summary.date) {
    return (
      <div className="container mx-auto">
        <footer className="flex justify-end py-12"></footer>
      </div>
    );
  }
  return (
    <div className="container mx-auto">
      <footer className="flex justify-end py-12">
        <Text>
          {summary.suite} (last updated {summary.date})
        </Text>
      </footer>
    </div>
  );
}
