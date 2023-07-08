export interface IAdapterSpec {
  method: string;
  global_prefix: string;
  instructions: string;
  input_prefix: string;
  input_suffix: string;
  reference_prefix: string;
  reference_suffix: string;
  instance_prefix: string;
  substitutions: any[];
  max_train_instances: number;
  max_eval_instances: number;
  num_outputs: number;
  num_train_trials: number;
  model: string;
  temperature: number;
  max_tokens: number;
  stop_sequences: string[];
}

export interface IRunSpec {
  name: string;
  scenario_spec: {
    class_name: string;
    args: {
      [key: string]: string;
    };
  };
  adapter_spec: IAdapterSpec;
  metric_specs: {
    [index: number]: {
      class_name: string;
      args: {
        names: (string | number | boolean | null)[];
      };
    };
  };
  data_augmenter_spec: {
    peturbation_specs: {
      [index: number]: {
        class_name: string;
        args: {
          names: (string | number | boolean | null)[];
        };
      };
    };
    should_augment_train_instances: boolean;
    should_include_original_train: boolean;
    should_skip_unchanged_train: boolean;
    should_include_original_eval: boolean;
    should_skip_unchanged_eval: boolean;
    seeds_per_instance: number;
  };
  groups: string[];
}

export interface IRunSpecFiltered {
  name: string;
  adapter_spec: {
    method: string;
  };
}

export default async function getRunSpecs(): Promise<IRunSpec[]> {
  try {
    const resp = await fetch(
      `https://storage.googleapis.com/crfm-helm-public/benchmark_output/runs/${process.env.NEXT_PUBLIC_HEML_SUITE}/run_specs.json`,
    );
    const data = await resp.json();

    return data;
  } catch {
    return [];
  }
}

export function filterRunSpecs(runSpecs: IRunSpec[]): IRunSpecFiltered[] {
  return runSpecs.map((runSpec) => ({
    name: runSpec.name,
    adapter_spec: {
      method: runSpec.adapter_spec.method,
    },
  }));
}
