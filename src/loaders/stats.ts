export interface IStat {
  count: number;
  max?: number;
  mean?: number;
  min?: number;
  name: {
    name: string;
    split?: string;
    perturbation?: {
      computed_on: number;
      fairness: number;
      name: string;
      robustness: number;
    };
  };
  stddev?: number;
  sum: number;
  sum_squared: number;
  variance?: number;
}

export interface IStatFiltered {
  mean?: number;
  name: {
    name: string;
    perturbation?: {
      name: string;
    };
    split?: string;
  };
}

/**
 * @SEE https://github.com/stanford-crfm/helm/blob/main/src/helm/benchmark/static/json-urls.js
 * @TODO Copy over or create new file with all the URL functions
 */
function statsJsonUrl(runSpecName: string): string {
  return `https://storage.googleapis.com/crfm-helm-public/benchmark_output/runs/${process.env.NEXT_PUBLIC_HEML_SUITE}/${runSpecName}/stats.json`;
}

export default async function getStats(runSpecName: string): Promise<IStat[]> {
  try {
    const resp = await fetch(statsJsonUrl(runSpecName));
    const data: IStat[] = await resp.json();

    return data;
  } catch (_) {
    return [];
  }
}

export function filterStats(stats: IStat[]): IStatFiltered[] {
  return stats.map(({ mean, name }) => {
    const filtered: IStatFiltered = {
      name: {
        name: name.name,
      },
    };

    if (name.split !== undefined) {
      filtered.name.split = name.split;
    }

    if (mean !== undefined) {
      filtered.mean = mean;
    }

    if (name.perturbation !== undefined) {
      filtered.name.perturbation = {
        name: name.perturbation.name,
      };
    }

    return filtered;
  });
}
