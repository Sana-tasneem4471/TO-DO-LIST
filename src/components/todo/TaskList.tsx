import React from 'react';
import { Task } from '../../types';
import { TaskItem } from './TaskItem';
import { List, AlertTriangle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleStatus, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-gray-500">
        <AlertTriangle className="h-12 w-12 mb-3 text-gray-400" />
        <p className="text-lg font-medium">No tasks found</p>
        <p className="text-sm mt-1">Try changing your filters or create a new task</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <List className="h-5 w-5 mr-2 text-indigo-600" />
        <h2 className="text-lg font-medium">Tasks ({tasks.length})</h2>
      </div>
      
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};