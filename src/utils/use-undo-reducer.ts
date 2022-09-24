import { Reducer, useCallback, useReducer } from "react";

const UNDO = "undo";
const REDO = "redo";
const SET = "set";
const RESET = "reset";

type ActionType = typeof UNDO | typeof REDO | typeof SET | typeof RESET;

type State<T> = {
  history: T[];
  current: T;
  future: T[];
};

type Action<T> = {
  type: ActionType;
  newCurrent?: T;
};

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { history, current, future } = state;
  const { type } = action;

  switch (type) {
    case UNDO: {
      if (history.length === 0) {
        return state;
      }

      const prev = history[history.length - 1];
      const newFuture = [current, ...future];
      const newHistory = history.slice(0, history.length - 1);

      return {
        history: newHistory,
        current: prev,
        future: newFuture,
      };
    }

    case REDO: {
      if (future.length === 0) {
        return state;
      }

      const next = future[0];
      const newHistory = [...history, current];
      const newFuture = future.slice(1);

      return {
        history: newHistory,
        current: next,
        future: newFuture,
      };
    }

    case SET: {
      if (action?.newCurrent === current) {
        return state;
      }

      const newHistory = [...history, current];

      return {
        history: newHistory,
        current: action?.newCurrent || state.current,
        future: [],
      };
    }

    case RESET: {
      return {
        history: [],
        current: action?.newCurrent || state.current,
        future: [],
      };
    }

    default:
      return state;
  }
};

export const useUndo = <T>(initCurrent: T) => {
  const [state, dispatch] = useReducer<Reducer<State<T>, Action<T>>>(
    undoReducer,
    {
      history: [],
      current: initCurrent,
      future: [],
    } as State<T>
  );

  const canUndo = state.history.length > 0;

  const canRedo = state.future.length > 0;

  const undo = useCallback(() => dispatch({ type: UNDO }), []);

  const redo = useCallback(() => dispatch({ type: REDO }), []);

  const set = useCallback(
    (newCurrent: T) => dispatch({ newCurrent, type: SET }),
    []
  );

  const reset = useCallback(
    (newCurrent: T) => dispatch({ newCurrent, type: RESET }),
    []
  );

  return [state, { undo, redo, set, reset, canUndo, canRedo }] as const;
};
