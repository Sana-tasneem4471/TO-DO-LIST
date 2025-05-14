import React from 'react';
import { CheckCircle, ListTodo, Tag, Flag, BarChart, Settings, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onClearCompleted: () => void;
  onMarkAllCompleted: () => void;
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  onClearCompleted,
  onMarkAllCompleted,
  stats,
}) => {
  return (
    <>
      {/* Backdrop for mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-indigo-800 text-white transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 z-30`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-indigo-700">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-6 w-6" />
            <h2 className="text-xl font-bold">TaskMaster</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-700 md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider">
            Dashboard
          </div>
          
          <a 
            href="#" 
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-indigo-900 text-white"
          >
            <ListTodo className="mr-3 h-5 w-5" />
            All Tasks
            <span className="ml-auto bg-indigo-600 py-0.5 px-2 rounded-md text-xs">
              {stats.total}
            </span>
          </a>
          
          <a 
            href="#" 
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-700"
          >
            <CheckCircle className="mr-3 h-5 w-5" />
            Completed
            <span className="ml-auto bg-emerald-600 py-0.5 px-2 rounded-md text-xs">
              {stats.completed}
            </span>
          </a>
          
          <a 
            href="#" 
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-700"
          >
            <Tag className="mr-3 h-5 w-5" />
            Categories
          </a>
          
          <a 
            href="#" 
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-700"
          >
            <Flag className="mr-3 h-5 w-5" />
            Priorities
          </a>
          
          <a 
            href="#" 
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-700"
          >
            <BarChart className="mr-3 h-5 w-5" />
            Statistics
          </a>
        </div>

        <div className="p-4 border-t border-indigo-700 space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full bg-transparent text-indigo-100 border-indigo-600 hover:bg-indigo-700"
            onClick={onClearCompleted}
          >
            Clear Completed
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            onClick={onMarkAllCompleted}
          >
            Mark All Complete
          </Button>
          
          <div className="pt-2 flex items-center justify-between text-xs text-indigo-300">
            <a href="#" className="hover:text-white">Help</a>
            <a href="#" className="hover:text-white flex items-center">
              <Settings className="h-3 w-3 mr-1" />
              Settings
            </a>
          </div>
        </div>
      </div>
    </>
  );
};