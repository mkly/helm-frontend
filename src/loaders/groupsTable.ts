export interface IRow {
  value: string;
  href?: string;
  description?: string;
  markdown: boolean;
}

export interface IGroupTable {
  title: string;
  links: {
    [key: number]: {
      text: string;
      href: string;
    };
  };
  header: {
    value: string;
    description: string;
    markdown: boolean;
    metadata: {
      [key: string]: unknown;
    };
  }[];
  rows: IRow[][];
}

export async function getGroupTablesByName(
  groupName: string,
): Promise<IGroupTable[]> {
  try {
    const resp = await fetch(
      `${
        process.env.NEXT_PUBLIC_HELM_PROXY
      }/crfm-helm-public/benchmark_output/runs/${
        process.env.NEXT_PUBLIC_HEML_SUITE
      }/groups/${encodeURIComponent(groupName)}.json`,
    );
    const data = await resp.json();

    return data;
  } catch (_) {
    return [];
  }
}

export default async function getGroupsTable(): Promise<IGroupTable[]> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_HELM_PROXY}/crfm-helm-public/benchmark_output/runs/${process.env.NEXT_PUBLIC_HELM_SUITE}/groups.json`,
    );
    const data = await resp.json();

    return data;
  } catch (_) {
    return [];
  }
}
