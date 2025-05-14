import React from 'react';
import { CheckCircle, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  title: string;
  openSidebar: boolean;
  onToggleSidebar: () => void;
  onClearCompleted: () => void;
  onMarkAllCompleted: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  openSidebar,
  onToggleSidebar,
  onClearCompleted,
  onMarkAllCompleted,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            >
              {openSidebar ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-7 w-7 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onClearCompleted}
              >
                Clear Completed
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={onMarkAllCompleted}
              >
                Mark All Complete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};