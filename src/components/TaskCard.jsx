import { Draggable } from 'react-beautiful-dnd';
import { useTaskContext } from '../context/TaskContext';
import { Trash2 } from 'lucide-react';

const TaskCard = ({ task, index }) => {
  const { deleteTask } = useTaskContext();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`p-3 mb-2 bg-white rounded-lg border border-gray-200 shadow-sm task-item ${
            snapshot.isDragging ? 'dragging' : ''
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between items-start">
            <p className="text-gray-800">{task.content}</p>
            <button
              className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
              onClick={() => deleteTask(task.id)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;