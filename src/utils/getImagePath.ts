export default function getImagePath(imageSrc: string) {
  return `/helm-frontend/${imageSrc.replace(/^\//, "")}`;
}
