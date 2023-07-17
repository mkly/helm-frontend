import React from "react";

import { InformationCircleIcon } from "@heroicons/react/outline";
import { Icon, Title } from "@tremor/react";

import type { IModel } from "loaders/schema";

interface Props {
  models: IModel[];
}

export default function ModelsList({ models }: Props) {
  return (
    <ul>
      <Title>{models.length} Models</Title>
      {models.map((model, idx) =>
        model.todo ? (
          <li key={idx} className="text-slate-300">
            <Icon
              color="slate"
              size="sm"
              icon={InformationCircleIcon}
              tooltip={model.description}
            />{" "}
            {model.creator_organization} / {model.display_name}
          </li>
        ) : (
          <li key={idx}>
            <Icon
              color="slate"
              size="sm"
              icon={InformationCircleIcon}
              tooltip={model.description}
            />{" "}
            {model.creator_organization} / {model.display_name}
          </li>
        ),
      )}
    </ul>
  );
}
