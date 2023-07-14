export default function getLinkPath(linkHref: string) {
  return `/helm-frontend/${linkHref.replace(/^\//, "")}`;
}
