import React from "react";
import { Button, Row } from "antd";
import { useUndo } from "../utils/use-undo";

export const Counter = () => {
  const [state, { redo, undo, set }] = useUndo(2);

  return (
    <>
      <Row>
        <h1>Counter: {state.current}</h1>
      </Row>
      <Row>
        <Button onClick={() => set(state.current + 1)}>Increase</Button>
        <Button onClick={() => set(state.current - 1)}>Decrease</Button>
        <Button onClick={undo} disabled={!state.canUndo}>
          Undo
        </Button>
        <Button onClick={redo} disabled={!state.canRedo}>
          Redo
        </Button>
      </Row>
    </>
  );
};
