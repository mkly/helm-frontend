import React from "react";

import { ListItem } from "@tremor/react";

interface Props {
  dict: {
    [key: string]: any;
  };
}

export default function DictRows({ dict }: Props) {
  return (
    <>
      {Object.keys(dict).map((key, idx) => (
        <ListItem key={idx}>
          <b>{key}:</b> {dict[key]}
        </ListItem>
      ))}
    </>
  );
}
