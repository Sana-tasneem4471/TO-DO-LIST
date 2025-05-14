import React, { useState } from 'react';
import { Task, Priority, Category } from '../../types';
import { Card, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { CheckCircle, Circle, Calendar, Clock, Tag, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleStatus, onDelete, onEdit }) => {
  const [expanded, setExpanded] = useState(false);

  // Define priority colors
  const priorityColors = {
    high: 'text-red-600',
    medium: 'text-amber-600',
    low: 'text-blue-600',
  };

  // Define category colors
  const categoryColors = {
    work: 'bg-blue-100 text-blue-800',
    personal: 'bg-purple-100 text-purple-800',
    shopping: 'bg-green-100 text-green-800',
    health: 'bg-amber-100 text-amber-800',
    other: 'bg-gray-100 text-gray-800',
  };

  const categoryIcons = {
    work: '💼',
    personal: '👤',
    shopping: '🛒',
    health: '❤️',
    other: '📌',
  };

  // Format category display
  const categoryDisplay = (category: Category) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[category]}`}>
      {categoryIcons[category]} {category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );

  return (
    <Card className={`mb-3 ${task.status === 'completed' ? 'opacity-75' : ''}`}>
      <CardBody className="p-0">
        <div className="flex items-center p-4">
          <button
            onClick={() => onToggleStatus(task.id)}
            className="flex-shrink-0 mr-3 focus:outline-none"
            aria-label={task.status === 'completed' ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.status === 'completed' ? (
              <CheckCircle className="h-6 w-6 text-emerald-500" />
            ) : (
              <Circle className="h-6 w-6 text-gray-400 hover:text-gray-600" />
            )}
          </button>

          <div className="flex-grow min-w-0">
            <div 
              className={`flex justify-between items-start gap-x-2 ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}
            >
              <div className="flex flex-col">
                <h3 className="text-sm font-medium text-gray-900 truncate">{task.title}</h3>
                <div className="flex items-center mt-1 text-xs text-gray-500 space-x-2">
                  {task.dueDate && (
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(task.dueDate)}
                    </span>
                  )}
                  <span className={`flex items-center ${priorityColors[task.priority]}`}>
                    <Tag className="h-3 w-3 mr-1" />
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {categoryDisplay(task.category)}
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="p-1 rounded-full hover:bg-gray-100"
                  aria-label={expanded ? 'Show less' : 'Show more'}
                >
                  {expanded ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {expanded && (
          <div className="px-4 pb-4 pt-0">
            {task.description && (
              <p className="text-sm text-gray-600 mt-2 mb-3">{task.description}</p>
            )}
            
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Created: {formatDate(task.createdAt)}
              </span>
              {task.completedAt && (
                <span className="flex items-center text-emerald-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed: {formatDate(task.completedAt)}
                </span>
              )}
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onEdit(task)}
                icon={<Edit2 className="h-4 w-4" />}
              >
                Edit
              </Button>
              <Button 
                variant="danger" 
                size="sm" 
                onClick={() => onDelete(task.id)}
                icon={<Trash2 className="h-4 w-4" />}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};