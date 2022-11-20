import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { Link } from "react-router-dom";

import { BoardScreen } from "../board";
import { EpicScreen } from "../epic";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>Project Screen</h1>
      <Link to={"board"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"/board"} element={<BoardScreen />} />
        <Route path={"/epic"} element={<EpicScreen />} />
        <Route
          index
          element={
            <Navigate to={window.location.pathname + "/board"} replace={true} />
          }
        />
      </Routes>
    </div>
  );
};
