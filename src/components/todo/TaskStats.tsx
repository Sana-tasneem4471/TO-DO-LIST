import React from 'react';
import { PieChart, BarChart2, Percent } from 'lucide-react';
import { Card, CardBody } from '../ui/Card';

interface TaskStatsProps {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
  byCategory: {
    work: number;
    personal: number;
    shopping: number;
    health: number;
    other: number;
  };
}

export const TaskStats: React.FC<TaskStatsProps> = ({
  total,
  completed,
  pending,
  completionRate,
  byPriority,
  byCategory,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-4 flex items-center">
        <BarChart2 className="h-5 w-5 mr-2 text-indigo-600" />
        Task Statistics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardBody className="flex flex-col items-center justify-center p-4">
            <div className="mb-2 text-indigo-600">
              <PieChart className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold">{total}</div>
            <div className="text-sm text-gray-500">Total Tasks</div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-col items-center justify-center p-4">
            <div className="mb-2 text-emerald-600">
              <div className="h-8 w-8 flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
            </div>
            <div className="text-3xl font-bold">{completed}</div>
            <div className="text-sm text-gray-500">Completed</div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-col items-center justify-center p-4">
            <div className="mb-2 text-amber-600">
              <div className="h-8 w-8 flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
            <div className="text-3xl font-bold">{pending}</div>
            <div className="text-sm text-gray-500">Pending</div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-col items-center justify-center p-4">
            <div className="mb-2 text-blue-600">
              <Percent className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold">{completionRate}%</div>
            <div className="text-sm text-gray-500">Completion Rate</div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Card>
          <CardBody>
            <h3 className="text-sm font-medium text-gray-700 mb-3">By Priority</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-red-600 font-medium">High</span>
                  <span>{byPriority.high}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full" 
                    style={{ width: `${total ? (byPriority.high / total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-amber-600 font-medium">Medium</span>
                  <span>{byPriority.medium}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-amber-600 h-2 rounded-full" 
                    style={{ width: `${total ? (byPriority.medium / total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-600 font-medium">Low</span>
                  <span>{byPriority.low}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${total ? (byPriority.low / total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="text-sm font-medium text-gray-700 mb-3">By Category</h3>
            <div className="space-y-3">
              {Object.entries(byCategory).map(([category, count]) => (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium capitalize">{category}</span>
                    <span>{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        category === 'work' ? 'bg-blue-600' :
                        category === 'personal' ? 'bg-purple-600' :
                        category === 'shopping' ? 'bg-green-600' :
                        category === 'health' ? 'bg-amber-600' :
                        'bg-gray-600'
                      }`}
                      style={{ width: `${total ? (count / total) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};