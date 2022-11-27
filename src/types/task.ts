export interface Task {
  id: number;
  name: string;
  processorId: number;
  projectId: number;
  epicId: number; // task group id
  kanbanId: number;
  type: string; // bug or task
  note: string;
}
