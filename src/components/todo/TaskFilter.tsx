import React from 'react';
import { TaskFilter as TaskFilterType, Status, Priority, Category } from '../../types';
import { Filter, Search, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface TaskFilterProps {
  filter: TaskFilterType;
  onFilterChange: (filter: TaskFilterType) => void;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({ filter, onFilterChange }) => {
  const handleStatusChange = (status?: Status) => {
    onFilterChange({ ...filter, status });
  };

  const handlePriorityChange = (priority?: Priority) => {
    onFilterChange({ ...filter, priority });
  };

  const handleCategoryChange = (category?: Category) => {
    onFilterChange({ ...filter, category });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filter, searchQuery: e.target.value });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = filter.status || filter.priority || filter.category || filter.searchQuery;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium flex items-center">
          <Filter className="h-5 w-5 mr-2 text-indigo-600" /> 
          Filter Tasks
        </h2>
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearFilters}
            icon={<X className="h-4 w-4" />}
          >
            Clear Filters
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={filter.searchQuery || ''}
            onChange={handleSearchChange}
            placeholder="Search tasks..."
            className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filter.status || ''}
              onChange={(e) => handleStatusChange(e.target.value as Status || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All</option>
              <option value="todo">To Do</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={filter.priority || ''}
              onChange={(e) => handlePriorityChange(e.target.value as Priority || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={filter.category || ''}
              onChange={(e) => handleCategoryChange(e.target.value as Category || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};