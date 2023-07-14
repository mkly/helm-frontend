import React from "react";

import NextLink from "next/link";

import getLinkPath from "utils/getLinkPath";

export default function Link(props: any) {
  return <NextLink {...props} href={getLinkPath(props.href)} />;
}
