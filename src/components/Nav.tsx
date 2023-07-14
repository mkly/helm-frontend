import React from "react";
import Link from "next/link";

import Image from "components/Image";

export default function Nav() {
  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div
        className="
                  container
                  px-6
                  py-3
                  mx-auto
                  md:flex md:justify-between md:items-center
                  "
      >
        <div className="flex items-center">
          <div className="flex flex-row items-center">
            <Link
              className="
                      text-xl
                      font-bold
                      text-gray-800
                      dark:text-white
                      md:text-2xl
                      hover:text-gray-700
                      dark:hover:text-gray-300
                      "
              href="https://crfm.stanford.edu/"
            >
              <Image
                src="/crfm-logo.png"
                alt="CRFM Logo"
                width="100"
                height="63"
              />
            </Link>
            <Link
              className="
                      text-xl
                      font-bold
                      text-gray-800
                      dark:text-white
                      md:text-2xl
                      hover:text-gray-700
                      dark:hover:text-gray-300
                      ml-6
                      "
              href="/"
            >
              <Image
                src="/helm-logo-simple.png"
                alt="HELM Logo"
                width="80"
                height="27"
              />
            </Link>
          </div>
        </div>

        <div className="items-center md:flex">
          <div className="flex flex-col md:flex-row md:mx-6">
            <Link
              className="
                      my-1
                      text-gray-700
                      dark:text-gray-200
                      hover:text-indigo-500
                      dark:hover:text-indigo-400
                      md:mx-4 md:my-0
                      "
              href="/models"
            >
              Models
            </Link>
            <Link
              className="
                      my-1
                      text-gray-700
                      dark:text-gray-200
                      hover:text-indigo-500
                      dark:hover:text-indigo-400
                      md:mx-4 md:my-0
                      "
              href="/scenarios"
            >
              Scenarios
            </Link>
            <Link
              className="
                      my-1
                      text-gray-700
                      dark:text-gray-200
                      hover:text-indigo-500
                      dark:hover:text-indigo-400
                      md:mx-4 md:my-0
                      "
              href="/groups"
            >
              Results
            </Link>
            <Link
              className="
                      my-1
                      text-gray-700
                      dark:text-gray-200
                      hover:text-indigo-500
                      dark:hover:text-indigo-400
                      md:mx-4 md:my-0
                      "
              href="/runs/page/1"
            >
              Raw Runs
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
