export interface Epic {
  id: number;
  projectId: number;
  boardId: number;
  name: string;
  start: number; // start time
  end: number; // end time
}
