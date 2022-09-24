import { useCallback, useState } from "react";

export const useUndo = <T>(initValue: T) => {
  const [state, setState] = useState<{
    history: T[];
    current: T;
    future: T[];
  }>({
    history: [],
    current: initValue,
    future: [],
  });

  const canUndo = state.history.length > 0;

  const canRedo = state.future.length > 0;

  const undo = useCallback(() => {
    setState((currentState) => {
      const { history, current, future } = currentState;

      if (history.length === 0) {
        return currentState;
      }

      const prev = history[history.length - 1];
      const newFuture = [current, ...future];
      const newHistory = history.slice(0, history.length - 1);

      return {
        history: newHistory,
        current: prev,
        future: newFuture,
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      const { history, current, future } = currentState;

      if (future.length === 0) {
        return currentState;
      }

      const next = future[0];
      const newHistory = [...history, current];
      const newFuture = future.slice(1);

      return {
        history: newHistory,
        current: next,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback((newCurrent: T) => {
    setState((currentState) => {
      const { history, current } = currentState;

      if (newCurrent === current) {
        return currentState;
      }

      const newHistory = [...history, current];

      return {
        history: newHistory,
        current: newCurrent,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newCurrent: T) => {
    setState({
      history: [],
      current: newCurrent,
      future: [],
    });
  }, []);

  return [state, { undo, redo, set, reset, canUndo, canRedo }] as const;
};
