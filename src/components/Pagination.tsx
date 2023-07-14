import React from "react";
import Link from "next/link";

interface Props {
  pageNumber: number;
  totalPages: number;
}

export default function Pagination({ pageNumber, totalPages }: Props) {
  let pagesToShow;
  if (pageNumber === 1) {
    pagesToShow = [pageNumber, 2, 3];
  } else if (pageNumber === totalPages) {
    pagesToShow = [pageNumber - 2, pageNumber - 1, pageNumber];
  } else {
    pagesToShow = [pageNumber - 1, pageNumber, pageNumber + 1];
  }

  const disabledPrevNext =
    "pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400";
  const abledPrevNext =
    "relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white";

  return (
    <nav aria-label="Page navigation example">
      <ul className="list-style-none flex">
        <li>
          <Link
            className={pageNumber === 1 ? disabledPrevNext : abledPrevNext}
            href={`/runs/page/${pageNumber - 1}`}
          >
            Previous
          </Link>
        </li>
        <li>
          <Link
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href={`/runs/page/${pagesToShow[0]}`}
          >
            {pagesToShow[0]}
          </Link>
        </li>
        <li aria-current="page">
          <Link
            className="relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300"
            href={`/runs/page/${pagesToShow[1]}`}
          >
            {pagesToShow[1]}
            <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
              (current)
            </span>
          </Link>
        </li>
        <li>
          <Link
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            href={`/runs/page/${pagesToShow[2]}`}
          >
            {pagesToShow[2]}
          </Link>
        </li>
        <li>
          <Link
            className={
              pageNumber === totalPages ? disabledPrevNext : abledPrevNext
            }
            href={`/runs/page/${pageNumber + 1}`}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
}
