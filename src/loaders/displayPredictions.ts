/**
 * @TODO Can we actually create
 * diffent interfaces for each stat?
 */
export interface IDisplayPrediction {
  instance_id: string;
  train_trial_index: number;
  predicted_text: string;
  reference_index?: string | number; // @FIXME its a guess
  truncated_prediction_text?: string;
  stats: {
    [key: string]: number;
  };
}

export interface IDisplayPredictionMap {
  [key: string]: IDisplayPrediction[];
}

export default async function getDisplayPredictions(
  runSpecName: string,
): Promise<IDisplayPrediction[]> {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_HELM_PROXY}/crfm-helm-public/benchmark_output/runs/${process.env.NEXT_PUBLIC_HELM_SUITE}/${runSpecName}/display_predictions.json`,
    );
    const data: IDisplayPrediction[] = await resp.json();

    return data;
  } catch (_) {
    return [];
  }
}

export async function getDisplayPredictionMap(
  runSpecName: string,
): Promise<IDisplayPredictionMap> {
  const displayPredictions = await getDisplayPredictions(runSpecName);
  return displayPredictions.reduce((acc, cur) => {
    if (acc[cur.instance_id] === undefined) {
      acc[cur.instance_id] = [];
    }
    acc[cur.instance_id].push(cur);

    return acc;
  }, {} as IDisplayPredictionMap);
}
