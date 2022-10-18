import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface State {
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false,
};

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    openProjectModal: (state) => {
      state.projectModalOpen = true;
    },
    closeProjectModal: (state) => {
      state.projectModalOpen = false;
    },
  },
});

export const projectListActions = projectListSlice.actions;

// prettier-ignore
export const selectedProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen
