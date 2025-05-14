import React, { useState, useEffect } from 'react';
import { Task, Priority, Category } from '../../types';
import { Button } from '../ui/Button';
import { Plus, X, Check, Calendar } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => void;
  onCancel: () => void;
  initialTask?: Task;
  isEditing?: boolean;
}

const emptyTask = {
  title: '',
  description: '',
  priority: 'medium' as Priority,
  category: 'personal' as Category,
  dueDate: undefined,
};

export const TaskForm: React.FC<TaskFormProps> = ({ 
  onSubmit, 
  onCancel, 
  initialTask, 
  isEditing = false 
}) => {
  const [task, setTask] = useState<Omit<Task, 'id' | 'createdAt' | 'status'>>(
    initialTask ? { 
      title: initialTask.title,
      description: initialTask.description || '',
      priority: initialTask.priority,
      category: initialTask.category,
      dueDate: initialTask.dueDate,
    } : emptyTask
  );

  // Reset form when initialTask changes
  useEffect(() => {
    if (initialTask) {
      setTask({
        title: initialTask.title,
        description: initialTask.description || '',
        priority: initialTask.priority,
        category: initialTask.category,
        dueDate: initialTask.dueDate,
      });
    } else {
      setTask(emptyTask);
    }
  }, [initialTask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTask(prev => ({ 
      ...prev, 
      dueDate: value ? new Date(value) : undefined 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task);
    if (!isEditing) {
      setTask(emptyTask); // Reset form only for new tasks
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <h2 className="text-lg font-medium mb-4">{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="What needs to be done?"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Add details about this task..."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={task.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''}
                onChange={handleDateChange}
                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          icon={<X className="h-4 w-4" />}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant={isEditing ? 'success' : 'primary'}
          icon={isEditing ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        >
          {isEditing ? 'Update Task' : 'Add Task'}
        </Button>
      </div>
    </form>
  );
};