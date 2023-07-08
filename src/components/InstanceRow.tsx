import React from "react";
import { Title, Subtitle, Text } from "@tremor/react";

import Predictions from "components/Predictions";
import References from "components/References";

import type { IInstanceFiltered } from "loaders/instances";
import type { IDisplayRequest } from "loaders/displayRequests";
import type { IDisplayPrediction } from "loaders/displayPredictions";

interface IInstanceRowProps {
  instance?: IInstanceFiltered;
  predictions?: IDisplayPrediction[];
  requests?: IDisplayRequest[];
}

export default function InstanceRow({
  instance,
  predictions,
  requests,
}: IInstanceRowProps) {
  return (
    <div className="mb-16">
      {instance ? (
        <Title className="text-2xl">
          Instance id: {instance.id} [split: {instance.split}]
        </Title>
      ) : null}
      <Subtitle>Input:</Subtitle>
      {instance ? (
        <Text>
          <pre>{instance.input.text}</pre>
        </Text>
      ) : null}
      {instance ? (
        <div className="mt-10">
          <References references={instance.references} />
        </div>
      ) : null}
      {predictions && requests ? (
        <div className="mt-6">
          <Predictions predictions={predictions} requests={requests} />
        </div>
      ) : null}
    </div>
  );
}
