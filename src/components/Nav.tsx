import React from "react";
import Link from "next/link";

import Image from "components/Image";

export default function Nav() {
  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div
        className="
                  container
                  py-3
                  mx-auto
                  flex justify-between items-center
                  "
      >
        <div className="flex items-center pl-2">
          <div className="flex flex-row items-center">
            <Link href="https://crfm.stanford.edu/">
              <Image
                src="/crfm-logo.png"
                alt="CRFM Logo"
                width="100"
                height="63"
              />
            </Link>
            <Link href="/">
              <Image
                src="/helm-logo-simple.png"
                alt="HELM Logo"
                width="80"
                height="27"
              />
            </Link>
          </div>
        </div>

        <div className="items-center flex pr-2">
          <div className="flex flex-row ml-6 justify-end">
            <Link
              className="
                      my-1
                      text-gray-700
                      dark:text-gray-200
                      hover:text-blue-500
                      dark:hover:text-blue-400
                      ml-4 my-0
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
                      hover:text-blue-500
                      dark:hover:text-blue-400
                      ml-8 my-0
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
                      hover:text-blue-500
                      dark:hover:text-blue-400
                      ml-8 my-0
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
                      hover:text-blue-500
                      dark:hover:text-blue-400
                      ml-8 my-0
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
