interface IResp {
  suite: string;
  date: string;
}

export interface ISummary {
  suite: string | null;
  date: Date | null;
}

export default async function getSummary(): Promise<ISummary> {
  try {
    const resp = await fetch(
      `https://storage.googleapis.com/crfm-helm-public/benchmark_output/runs/${process.env.NEXT_PUBLIC_HELM_SUITE}/summary.json`,
    );
    const data: IResp = await resp.json();
    /**
     * We just assume PST and pretend PDT does not exist
     * to limit complexity for something unlikely to
     * be concerned about
     */
    const summary: ISummary = {
      suite: data.suite,
      date: new Date(`${data.date}T12:00:00-08:00`),
    };

    return summary;
  } catch (_) {
    return {
      suite: null,
      date: null,
    };
  }
}
