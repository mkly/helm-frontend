import { parse } from "yaml";

export interface IAdapter {
  name: string;
  description: string;
  values?: {
    name: string;
    description: string;
  }[];
}

export interface IMetricGroup {
  name: string;
  display_name: string;
  metrics: {
    name: string;
    split: string;
  }[];
}

export interface IMetric {
  name: string;
  display_name: string;
  description: string;
}

export interface IModel {
  name: string;
  display_name: string;
  description: string;
  description_html: string;
  access: string;
  creator_organization: string;
  num_parameters: string;
  release_date: Date;
  todo?: boolean;
}

export interface IPeturbation {
  name: string;
  display_name: string;
  description: string;
}

/**
 * @TODO This is likely combining distinct entities
 * We're just using optional properties because
 * we don't actually know what those are right now
 */
export interface IRunGroup {
  name: string;
  display_name: string;
  description: string;
  environment?: {
    main_name: string;
    main_split: string;
  };
  metric_groups?: string[];
  taxonomy?: {
    language: string;
    task: string;
    what: string;
    when: string;
    who: string;
  };
  todo?: boolean;
  category?: string;
  subgroups?: string[];
}

export interface IRunGroupBuckets {
  [key: string]: IRunGroup[];
}

export interface ISchema {
  adapter: IAdapter[];
  metric_groups: IMetricGroup[];
  metrics: IMetric[];
  models: IModel[];
  perturbations: IPeturbation[];
  run_groups: IRunGroup[];
}

export default async function getSchema(): Promise<ISchema> {
  try {
    const resp = await fetch(
      "https://crfm.stanford.edu/helm/latest/schema.yaml",
    );
    const data = await resp.text();
    const schema: ISchema = parse(data);

    return schema;
  } catch (_) {
    return {
      adapter: [],
      metric_groups: [],
      metrics: [],
      models: [],
      perturbations: [],
      run_groups: [],
    };
  }
}

export function getRunGroupTaskBucketsFromRunGroups(
  runGroups: IRunGroup[],
): IRunGroupBuckets {
  return runGroups.reduce((acc, cur) => {
    if (cur.taxonomy === undefined) {
      return acc;
    }
    if (acc[cur.taxonomy.task] === undefined) {
      acc[String(cur.taxonomy.task)] = [];
    }
    // This will result in an 'undefined' key
    acc[String(cur.taxonomy.task)].push(cur);

    return acc;
  }, {} as IRunGroupBuckets);
}

export function getTotalFromRunGroupTaskBuckets(
  buckets: IRunGroupBuckets,
): number {
  return Object.keys(buckets).reduce((acc, cur) => {
    return acc + buckets[cur].length;
  }, 0);
}
