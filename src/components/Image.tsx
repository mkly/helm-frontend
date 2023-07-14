import React from "react";

import NextImage from "next/image";

import getImagePath from "utils/getImagePath";

export default function Image(props: any) {
  return <NextImage {...props} src={getImagePath(props.src)} />;
}
