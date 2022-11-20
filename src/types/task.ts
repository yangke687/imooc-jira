export interface Task {
  id: number;
  name: string;
  processorId: number;
  projectId: number;
  epicId: number; // task group id
  boardId: number;
  type: string; // bug or task
  note: string;
}
