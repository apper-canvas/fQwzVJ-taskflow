const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Design new landing page' },
    'task-2': { id: 'task-2', content: 'Implement authentication' },
    'task-3': { id: 'task-3', content: 'Create API documentation' },
    'task-4': { id: 'task-4', content: 'Set up CI/CD pipeline' },
    'task-5': { id: 'task-5', content: 'Fix responsive layout issues' },
    'task-6': { id: 'task-6', content: 'Conduct user testing' },
    'task-7': { id: 'task-7', content: 'Update dependencies' },
    'task-8': { id: 'task-8', content: 'Refactor legacy code' },
    'task-9': { id: 'task-9', content: 'Optimize database queries' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-5', 'task-6'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-7', 'task-8', 'task-9'],
    },
  },
  // This maintains the column order
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;