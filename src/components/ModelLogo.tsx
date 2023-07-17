import React from "react";

import Image from "components/Image";

const modelOrgImageMap: {
  [key: string]: string;
} = {
  "AI21 Labs": "ai21.png",
  Anthropic: "anthropic.png",
  BigScience: "bigscience.png",
  Cohere: "cohere.png",
  EleutherAI: "eleutherai.png",
  Google: "google.png",
  Meta: "meta.png",
  "Microsoft/NVIDIA": "microsoft.png",
  NVIDIA: "nvidia.png",
  OpenAI: "openai.png",
  Together: "together.png",
  Tsinghua: "tsinghua-keg.png",
  Yandex: "yandex.png",
};

interface Props {
  modelOrganization: string;
}

export default function ModelLogo({ modelOrganization }: Props) {
  if (modelOrgImageMap[modelOrganization] === undefined) {
    return modelOrganization;
  }

  return (
    <Image
      alt="logo"
      src={`/logos/${modelOrgImageMap[modelOrganization]}`}
      height={80}
      width={80}
      className="block mx-auto"
    />
  );
}
