import { useAsync } from "../utils/use-async";
import { act, renderHook } from "@testing-library/react-hooks";

const defaultState: ReturnType<typeof useAsync> = {
  stat: "idle",
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  run: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
  retry: expect.any(Function),
};

const isLoading: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: "loading",
  isIdle: false,
  isLoading: true,
};

const success: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: "success",
  isIdle: false,
  isSuccess: true,
};

test("useAsync async handle", async () => {
  let resolved: any, rejected: any;
  const p0 = new Promise((res, rej) => {
    resolved = res;
    rejected = rej;
  });

  // init
  const { result } = renderHook(() => useAsync());
  expect(result.current).toEqual(defaultState);

  // test 'loading'
  let p1: Promise<any>;
  await act(() => {
    p1 = result.current.run(p0); // p1 is a new promise returned by execution of promise p0
  });
  // console.log("test loading:", result.current);
  expect(result.current).toEqual(isLoading);

  // test 'success'
  const resolvedValue = { mockedValue: "resolved" };
  await act(async () => {
    resolved(resolvedValue);
    await p1;
  });
  // console.log("test success:", result.current);
  expect(result.current).toEqual({
    ...success,
    data: resolvedValue,
  });
});
