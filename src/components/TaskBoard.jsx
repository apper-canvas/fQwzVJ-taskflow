import { DragDropContext } from 'react-beautiful-dnd';
import { useTaskContext } from '../context/TaskContext';
import TaskColumn from './TaskColumn';
import { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';

const TaskBoard = () => {
  const { taskData, reorderTasks, moveTask, addTask } = useTaskContext();
  const [newTaskText, setNewTaskText] = useState('');
  const [activeColumn, setActiveColumn] = useState(null);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If there's no destination, the item was dropped outside the list
    if (!destination) {
      return;
    }

    // If the item was dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the item was moved within the same column
    if (source.droppableId === destination.droppableId) {
      reorderTasks(
        source.droppableId,
        source.index,
        destination.index
      );
    } else {
      // If the item was moved to a different column
      moveTask(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index
      );
    }
  };

  const handleAddTask = (columnId) => {
    if (newTaskText.trim()) {
      addTask(columnId, newTaskText.trim());
      setNewTaskText('');
      setActiveColumn(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 min-w-max pb-2">
          {taskData.columnOrder.map((columnId) => {
            const column = taskData.columns[columnId];
            const tasks = column.taskIds.map((taskId) => taskData.tasks[taskId]);

            return (
              <div key={column.id} className="w-80 flex-shrink-0">
                <div className="bg-gray-100 p-4 rounded-t-lg border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-700">{column.title}</h3>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {tasks.length}
                    </span>
                  </div>
                </div>
                
                <TaskColumn 
                  key={column.id} 
                  column={column} 
                  tasks={tasks} 
                />
                
                <div className="bg-white p-3 rounded-b-lg border-t border-gray-100 shadow-sm">
                  {activeColumn === column.id ? (
                    <div className="space-y-2">
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter task details..."
                        value={newTaskText}
                        onChange={(e) => setNewTaskText(e.target.value)}
                        rows={2}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                          onClick={() => {
                            setActiveColumn(null);
                            setNewTaskText('');
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          onClick={() => handleAddTask(column.id)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="w-full py-2 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setActiveColumn(column.id)}
                    >
                      <PlusCircle size={16} />
                      <span>Add Task</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;