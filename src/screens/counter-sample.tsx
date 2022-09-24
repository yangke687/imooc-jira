import React from "react";
import { Button, Row } from "antd";
// import { useUndo } from "../utils/use-undo";
import { useUndo } from "../utils/use-undo-reducer";

export const Counter = () => {
  const [state, { redo, undo, set, canUndo, canRedo }] = useUndo(0);

  return (
    <>
      <Row>
        <h1>Counter: {state.current}</h1>
      </Row>
      <Row>
        <Button onClick={() => set(state.current + 1)}>Increase</Button>
        <Button onClick={() => set(state.current - 1)}>Decrease</Button>
        <Button onClick={undo} disabled={!canUndo}>
          Undo
        </Button>
        <Button onClick={redo} disabled={!canRedo}>
          Redo
        </Button>
      </Row>
    </>
  );
};
