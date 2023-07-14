export interface IReference {
  output: {
    text: string;
  };
  tags: string[];
}

export interface IReferenceFiltered extends IReference {}

export interface IInstance {
  input: {
    text: string;
  };
  references: IReference[];
  split: string;
  id: string;
}

export interface IInstanceFiltered {
  input: {
    text: string;
  };
  references: IReferenceFiltered[];
  split: string;
  id: string;
}

export default async function getInstances(
  runSpecName: string,
): Promise<IInstance[]> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_HELM_PROXY}/crfm-helm-public/benchmark_output/runs/${process.env.NEXT_PUBLIC_HELM_SUITE}/${runSpecName}/instances.json`,
    );
    const data: IInstance[] = await resp.json();

    return data;
  } catch (_) {
    return [];
  }
}

export function filterInstances(instances: IInstance[]): IInstanceFiltered[] {
  return instances.map(({ id, input, references, split }) => ({
    id,
    input,
    references,
    split,
  }));
}
