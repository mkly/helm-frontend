import React from "react";
import NextHead from "next/head";

type Props = {
  title: string;
};

export default function Head({ title }: Props) {
  return (
    <NextHead>
      <title>HELM - {title}</title>
    </NextHead>
  );
}
