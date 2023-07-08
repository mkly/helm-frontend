/**
 * @TODO Can we actually create
 * different request objects?
 */
export interface IDisplayRequest {
  instance_id: string;
  train_trial_index: number;
  request: {
    prompt: string;
    model?: string;
    embedding?: boolean;
    temperature?: number;
    num_completions?: number;
    top_k_per_token?: number;
    stop_sequences?: string[];
    echo_prompt?: boolean;
    top_p?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
    [key: string]: any;
  };
}

export interface IDisplayRequestMap {
  [key: string]: IDisplayRequest[];
}

export default async function getDisplayRequests(
  runSpecName: string,
): Promise<IDisplayRequest[]> {
  try {
    const resp = await fetch(
      `https://storage.googleapis.com/crfm-helm-public/benchmark_output/runs/${process.env.NEXT_PUBLIC_HEML_SUITE}/${runSpecName}/display_requests.json`,
    );
    const data: IDisplayRequest[] = await resp.json();

    return data;
  } catch (_) {
    return [];
  }
}

export async function getDisplayRequestMap(
  runSpecName: string,
): Promise<IDisplayRequestMap> {
  const displayRequests = await getDisplayRequests(runSpecName);
  return displayRequests.reduce((acc, cur) => {
    if (acc[cur.instance_id] === undefined) {
      acc[cur.instance_id] = [];
    }
    acc[cur.instance_id].push(cur);

    return acc;
  }, {} as IDisplayRequestMap);
}
