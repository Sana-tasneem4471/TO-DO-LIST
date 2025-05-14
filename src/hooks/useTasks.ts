import { useState, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Task, TaskFilter, Priority, Category, Status } from '../types';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<TaskFilter>({});

  // Generate a unique ID for new tasks
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Add a new task
  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    const newTask: Task = {
      id: generateId(),
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
      status: 'todo',
      createdAt: new Date(),
      dueDate: task.dueDate,
    };
    setTasks([...tasks, newTask]);
  };

  // Update an existing task
  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, ...updates };
        }
        return task;
      })
    );
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle task status
  const toggleTaskStatus = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const newStatus = task.status === 'todo' ? 'completed' : 'todo';
          return {
            ...task,
            status: newStatus,
            completedAt: newStatus === 'completed' ? new Date() : undefined,
          };
        }
        return task;
      })
    );
  };

  // Filter tasks based on current filter
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus = !filter.status || task.status === filter.status;
      const matchesPriority = !filter.priority || task.priority === filter.priority;
      const matchesCategory = !filter.category || task.category === filter.category;
      const matchesQuery =
        !filter.searchQuery ||
        task.title.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(filter.searchQuery.toLowerCase()));

      return matchesStatus && matchesPriority && matchesCategory && matchesQuery;
    });
  }, [tasks, filter]);

  // Calculate task statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const pending = total - completed;
    const completionRate = total ? Math.round((completed / total) * 100) : 0;

    const byPriority = {
      high: tasks.filter((t) => t.priority === 'high').length,
      medium: tasks.filter((t) => t.priority === 'medium').length,
      low: tasks.filter((t) => t.priority === 'low').length,
    };

    const byCategory = {
      work: tasks.filter((t) => t.category === 'work').length,
      personal: tasks.filter((t) => t.category === 'personal').length,
      shopping: tasks.filter((t) => t.category === 'shopping').length,
      health: tasks.filter((t) => t.category === 'health').length,
      other: tasks.filter((t) => t.category === 'other').length,
    };

    return {
      total,
      completed,
      pending,
      completionRate,
      byPriority,
      byCategory,
    };
  }, [tasks]);

  // Clear all completed tasks
  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => task.status !== 'completed'));
  };

  // Mark all tasks as completed
  const markAllCompleted = () => {
    setTasks(
      tasks.map((task) => ({
        ...task,
        status: 'completed',
        completedAt: task.status === 'todo' ? new Date() : task.completedAt,
      }))
    );
  };

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    filter,
    stats,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    setFilter,
    clearCompletedTasks,
    markAllCompleted,
  };
}