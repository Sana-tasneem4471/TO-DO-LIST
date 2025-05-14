import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { TaskList } from './components/todo/TaskList';
import { TaskForm } from './components/todo/TaskForm';
import { TaskFilter } from './components/todo/TaskFilter';
import { TaskStats } from './components/todo/TaskStats';
import { Task } from './types';
import { useTasks } from './hooks/useTasks';
import { PlusCircle } from 'lucide-react';
import { Button } from './components/ui/Button';

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  
  const {
    tasks,
    filter,
    stats,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    setFilter,
    clearCompletedTasks,
    markAllCompleted
  } = useTasks();

  const handleAddTask = (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    addTask(task);
    setShowAddForm(false);
  };

  const handleUpdateTask = (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    if (editingTask) {
      updateTask(editingTask.id, task);
      setEditingTask(undefined);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowAddForm(false);
  };

  const handleCancelEdit = () => {
    setEditingTask(undefined);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar 
        open={openSidebar} 
        onClose={() => setOpenSidebar(false)} 
        onClearCompleted={clearCompletedTasks}
        onMarkAllCompleted={markAllCompleted}
        stats={{
          total: stats.total,
          completed: stats.completed,
          pending: stats.pending
        }}
      />
      
      <div className="flex-1 md:ml-64">
        <Header 
          title="TaskMaster" 
          openSidebar={openSidebar}
          onToggleSidebar={toggleSidebar}
          onClearCompleted={clearCompletedTasks}
          onMarkAllCompleted={markAllCompleted}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
            {!showAddForm && !editingTask && (
              <Button
                variant="primary"
                onClick={() => setShowAddForm(true)}
                icon={<PlusCircle className="h-5 w-5" />}
              >
                Add New Task
              </Button>
            )}
          </div>
          
          {showAddForm && !editingTask && (
            <TaskForm
              onSubmit={handleAddTask}
              onCancel={handleCancelAdd}
            />
          )}
          
          {editingTask && (
            <TaskForm
              onSubmit={handleUpdateTask}
              onCancel={handleCancelEdit}
              initialTask={editingTask}
              isEditing
            />
          )}
          
          <TaskStats
            total={stats.total}
            completed={stats.completed}
            pending={stats.pending}
            completionRate={stats.completionRate}
            byPriority={stats.byPriority}
            byCategory={stats.byCategory}
          />
          
          <TaskFilter
            filter={filter}
            onFilterChange={setFilter}
          />
          
          <TaskList
            tasks={tasks}
            onToggleStatus={toggleTaskStatus}
            onDelete={deleteTask}
            onEdit={handleEditTask}
          />
        </main>
      </div>
    </div>
  );
}

export default App;