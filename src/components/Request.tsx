"use client";

import React from "react";
import { List, ListItem, Title } from "@tremor/react";

import type { IDisplayRequest } from "loaders/displayRequests";

type Props = {
  request: IDisplayRequest;
};

export default function Request({ request }: Props) {
  return (
    <>
      <List>
        <ListItem key={0} className="block">
          <Title className="block">Prompt</Title>
          <div className="block overflow-y-scroll w-full max-h-72">
            <pre>{request.request.prompt}</pre>
          </div>
        </ListItem>

        {Object.keys(request.request)
          .filter((key) => key !== "prompt")
          .map((key, idx) => (
            <ListItem key={idx + 1}>
              <span>
                {key}: {request.request[key]}
              </span>
            </ListItem>
          ))}
      </List>
    </>
  );
}
