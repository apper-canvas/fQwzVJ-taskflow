import { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskBoard from '../components/TaskBoard';

const HomePage = () => {
  const [showNewTaskInput, setShowNewTaskInput] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Tasker</h1>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors"
              onClick={() => setShowNewTaskInput(!showNewTaskInput)}
            >
              <Plus size={18} />
              Add Task
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Task Board</h2>
          <p className="text-gray-600">Drag and drop tasks to reorder or move between columns.</p>
        </div>
        
        <TaskBoard />
      </main>
    </div>
  );
};

export default HomePage;