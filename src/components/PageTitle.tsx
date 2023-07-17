import React, { PropsWithChildren } from "react";

export default function PageTitle({ children }: PropsWithChildren) {
  return (
    <h1 className="text-4xl py-8 px-4 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
      {children}
    </h1>
  );
}
