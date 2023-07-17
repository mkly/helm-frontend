import React from "react";
import Link from "next/link";

interface Props {
  pageNumber: number;
  totalPages: number;
}

const size = 5;

export default function Pagination({ pageNumber, totalPages }: Props) {
  let pagesToShow: number[];

  if (pageNumber < Math.ceil(size / 2)) {
    pagesToShow = Array.from(Array(size).keys()).map((x) => x + 1);
  } else if (pageNumber > totalPages - Math.floor(size / 2)) {
    pagesToShow = Array.from(Array(size).keys()).map(
      (x) => totalPages - size + x + 1,
    );
  } else {
    pagesToShow = Array.from(Array(size).keys()).map(
      (x) => pageNumber - Math.floor(size / 2) + x,
    );
  }

  const disabledPrevNext =
    "pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400 opacity-50";
  const abledPrevNext =
    "relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white";

  return (
    <nav aria-label="page navigation" className="mt-10 flex justify-center">
      <ul className="list-style-none flex">
        <li>
          <Link
            className={pageNumber === 1 ? disabledPrevNext : abledPrevNext}
            href={`/runs/page/${pageNumber - 1}`}
          >
            Previous
          </Link>
        </li>
        {pagesToShow.map((page, idx) => {
          if (pageNumber === page) {
            return (
              <li key={idx} aria-current="page">
                <Link
                  className="relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-bold text-primary-700 transition-all duration-300 pointer-events-none"
                  href={`/runs/page/${pagesToShow[idx]}`}
                >
                  {pagesToShow[idx]}
                </Link>
              </li>
            );
          }
          return (
            <li key={idx}>
              <Link
                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                href={`/runs/page/${pagesToShow[idx]}`}
              >
                {pagesToShow[idx]}
              </Link>
            </li>
          );
        })}
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
