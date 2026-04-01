export interface WorkoutEntry {
  id?: string;
  movement: string;
  reps: number;
  weight: number;
}

export interface WorkoutDocument {
  id?: string;
  date: Date;
  entries: WorkoutEntry[];
  createdAt: Date;
}
