import { useState } from "react";
import { useMountedRef } from "./index";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};

const defaultConfig = {
  throwError: false,
};

export const useAsync = <D>(
  initState?: State<D>,
  initConfig?: typeof defaultConfig
) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitState,
    ...initState,
  });

  const config = { ...defaultConfig, ...initConfig };

  const mountedRef = useMountedRef();

  const [retry, setRetry] = useState(() => () => {});

  const setData = (data: D) =>
    setState({
      data,
      error: null,
      stat: "success",
    });

  const setError = (error: Error) =>
    setState({
      error,
      data: null,
      stat: "error",
    });

  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入Promise类型参数");
    }

    setState({ ...state, stat: "loading" });

    setRetry(() => () => {
      if (runConfig?.retry()) {
        run(runConfig.retry(), { retry: runConfig.retry });
      }
    });

    return promise
      .then((data) => {
        // setData only when component has been mounted
        if (mountedRef.current) {
          console.log(
            "[useAsync]: setData only when component has been mounted"
          );
          setData(data);
        }

        return data;
      })
      .catch((err) => {
        setError(err);
        if (config.throwError) {
          return Promise.reject(err);
        }
        return err;
      })
      .finally(() => {});
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
