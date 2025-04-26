import { createContext, useContext, useState } from 'react';
import initialData from '../utils/initialData';

const TaskContext = createContext();

export function useTaskContext() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const [taskData, setTaskData] = useState(initialData);

  // Function to reorder tasks within the same column
  const reorderTasks = (columnId, startIndex, endIndex) => {
    const newTaskData = { ...taskData };
    const column = newTaskData.columns[columnId];
    const newTaskIds = [...column.taskIds];
    
    // Remove the task from its original position
    const [removedTask] = newTaskIds.splice(startIndex, 1);
    // Insert the task at the new position
    newTaskIds.splice(endIndex, 0, removedTask);
    
    // Update the column with the new task order
    newTaskData.columns[columnId] = {
      ...column,
      taskIds: newTaskIds
    };
    
    setTaskData(newTaskData);
  };

  // Function to move a task from one column to another
  const moveTask = (sourceColumnId, destinationColumnId, sourceIndex, destinationIndex) => {
    const newTaskData = { ...taskData };
    const sourceColumn = newTaskData.columns[sourceColumnId];
    const destinationColumn = newTaskData.columns[destinationColumnId];
    
    // Create new arrays for the task IDs
    const sourceTaskIds = [...sourceColumn.taskIds];
    const destinationTaskIds = [...destinationColumn.taskIds];
    
    // Remove the task from the source column
    const [movedTask] = sourceTaskIds.splice(sourceIndex, 1);
    // Add the task to the destination column
    destinationTaskIds.splice(destinationIndex, 0, movedTask);
    
    // Update the columns with the new task orders
    newTaskData.columns[sourceColumnId] = {
      ...sourceColumn,
      taskIds: sourceTaskIds
    };
    newTaskData.columns[destinationColumnId] = {
      ...destinationColumn,
      taskIds: destinationTaskIds
    };
    
    setTaskData(newTaskData);
  };

  // Add a new task
  const addTask = (columnId, taskContent) => {
    const newTaskData = { ...taskData };
    const newTaskId = `task-${Object.keys(newTaskData.tasks).length + 1}`;
    
    // Create the new task
    newTaskData.tasks[newTaskId] = {
      id: newTaskId,
      content: taskContent
    };
    
    // Add the task ID to the specified column
    newTaskData.columns[columnId].taskIds.push(newTaskId);
    
    setTaskData(newTaskData);
  };

  // Delete a task
  const deleteTask = (taskId) => {
    const newTaskData = { ...taskData };
    
    // First, find which column contains this task
    let columnId = '';
    for (const colId in newTaskData.columns) {
      if (newTaskData.columns[colId].taskIds.includes(taskId)) {
        columnId = colId;
        break;
      }
    }
    
    if (columnId) {
      // Remove the task ID from the column
      newTaskData.columns[columnId].taskIds = newTaskData.columns[columnId].taskIds.filter(
        id => id !== taskId
      );
      
      // Delete the task itself
      delete newTaskData.tasks[taskId];
      
      setTaskData(newTaskData);
    }
  };

  const value = {
    taskData,
    reorderTasks,
    moveTask,
    addTask,
    deleteTask
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}