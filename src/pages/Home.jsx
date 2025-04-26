import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock, LayoutGrid, ListFilter } from "lucide-react";
import MainFeature from "../components/MainFeature";

const Home = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("list");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return true;
    if (activeTab === "completed") return task.isCompleted;
    if (activeTab === "pending") return !task.isCompleted;
    return true;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const taskVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    exit: { 
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tasker
        </motion.h1>
        <motion.p 
          className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Organize your day, boost your productivity
        </motion.p>
      </div>

      <MainFeature onAddTask={addTask} />

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex bg-surface-100 dark:bg-surface-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "all"
                  ? "bg-white dark:bg-surface-700 shadow-sm"
                  : "text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "pending"
                  ? "bg-white dark:bg-surface-700 shadow-sm"
                  : "text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "completed"
                  ? "bg-white dark:bg-surface-700 shadow-sm"
                  : "text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200"
              }`}
            >
              Completed
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${
                viewMode === "list"
                  ? "bg-primary/10 text-primary dark:bg-primary/20"
                  : "text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800"
              }`}
              aria-label="List view"
            >
              <ListFilter size={20} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${
                viewMode === "grid"
                  ? "bg-primary/10 text-primary dark:bg-primary/20"
                  : "text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid size={20} />
            </button>
          </div>
        </div>

        {tasks.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-800 mb-4">
              <Clock className="h-8 w-8 text-surface-400" />
            </div>
            <h3 className="text-lg font-medium mb-1">No tasks yet</h3>
            <p className="text-surface-500 dark:text-surface-400">
              Add your first task to get started
            </p>
          </motion.div>
        ) : filteredTasks.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-800 mb-4">
              <CheckCircle2 className="h-8 w-8 text-surface-400" />
            </div>
            <h3 className="text-lg font-medium mb-1">No {activeTab} tasks</h3>
            <p className="text-surface-500 dark:text-surface-400">
              {activeTab === "completed" 
                ? "Complete some tasks to see them here" 
                : "All tasks are completed"}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            className={`grid ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            } gap-4`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  className={`task-card ${
                    task.isCompleted ? "border-l-4 border-l-green-500" : 
                    task.priority === "high" ? "border-l-4 border-l-red-500" :
                    task.priority === "medium" ? "border-l-4 border-l-yellow-500" :
                    "border-l-4 border-l-blue-500"
                  }`}
                  variants={taskVariants}
                  exit="exit"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className={`flex-shrink-0 w-6 h-6 mt-0.5 rounded-full border-2 ${
                        task.isCompleted
                          ? "bg-green-500 border-green-500"
                          : "border-surface-300 dark:border-surface-600"
                      } flex items-center justify-center transition-colors`}
                      aria-label={task.isCompleted ? "Mark as incomplete" : "Mark as complete"}
                    >
                      {task.isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg font-medium mb-1 ${
                        task.isCompleted ? "line-through text-surface-400" : ""
                      }`}>
                        {task.title}
                      </h3>
                      
                      {task.description && (
                        <p className={`text-sm text-surface-600 dark:text-surface-400 mb-2 ${
                          task.isCompleted ? "line-through" : ""
                        }`}>
                          {task.description}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {task.category && (
                          <span className={`category-pill ${
                            task.category === "work" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                            task.category === "personal" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" :
                            task.category === "shopping" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                            "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                          }`}>
                            {task.category}
                          </span>
                        )}
                        
                        <span className={`category-pill ${
                          task.priority === "high" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                          task.priority === "medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" :
                          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        }`}>
                          {task.priority} priority
                        </span>
                        
                        {task.dueDate && (
                          <span className="category-pill bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {task.dueDate}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-surface-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      aria-label="Delete task"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;