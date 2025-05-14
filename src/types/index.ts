export type Priority = 'low' | 'medium' | 'high';
export type Category = 'work' | 'personal' | 'shopping' | 'health' | 'other';
export type Status = 'todo' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  category: Category;
  status: Status;
  createdAt: Date;
  dueDate?: Date;
  completedAt?: Date;
}

export interface TaskFilter {
  status?: Status;
  priority?: Priority;
  category?: Category;
  searchQuery?: string;
}