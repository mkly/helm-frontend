import React from "react";
import { List, ListItem, Title, Subtitle, Text, Bold } from "@tremor/react";

import type { IReferenceFiltered } from "loaders/instances";

type ReferencesProps = {
  references: IReferenceFiltered[];
};

export default function References({ references }: ReferencesProps) {
  if (references.length < 1) {
    return null;
  }

  return (
    <>
      <Title>Reference{references.length === 1 ? "" : "s"}</Title>
      <List>
        {references.map((reference, idx) => (
          <ListItem key={idx}>
            <span>
              {reference.output.text} <Bold>[{reference.tags.join(",")}]</Bold>
            </span>
          </ListItem>
        ))}
      </List>
    </>
  );
}
