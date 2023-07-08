import React from "react";

const colors = [
  "blue",
  "cyan",
  "sky",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "pink",
  "rose",
];

interface Props {
  categories: string[];
  activeCategories?: Map<string, true>;
  onClick: (category: string, idx: number) => void;
}

export default function Legend({
  categories,
  activeCategories = new Map(),
  onClick,
}: Props) {
  return (
    <ol>
      {categories.map((category, idx) => (
        <li
          className={`cursor-pointer flex-none inline-flex items-center truncate text-tremor-content dark:text-dark-tremor-content mr-4${
            activeCategories.has(category) ? " bg-slate-200" : ""
          }`}
          onClick={() => onClick(category, idx)}
          key={idx}
        >
          <svg
            className={`h-2 w-2 text-${colors[idx]}-500`}
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx={4} cy={4} r={4} />
          </svg>
          <p className="whitespace-nowrap ml-2 truncate text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            {category}
          </p>
        </li>
      ))}
    </ol>
  );
}
