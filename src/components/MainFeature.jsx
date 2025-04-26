import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Calendar, Tag, Clock, AlertCircle } from "lucide-react";
import { useTaskContext } from "../context/TaskContext";

const MainFeature = ({ onAddTask }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "",
    dueDate: "",
  });
  const [errors, setErrors] = useState({});
  const { addTask: addTaskToContext } = useTaskContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }
    
    if (formData.priority === "") {
      newErrors.priority = "Please select a priority";
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Create task for the local state management
    const newTask = {
      id: `task-${Date.now()}`,
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      category: formData.category,
      dueDate: formData.dueDate,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };
    
    // Add task to the regular task list
    onAddTask(newTask);
    
    // Also add the task to the drag-and-drop context - add to the first column (To Do)
    addTaskToContext('column-1', formData.title.trim());
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      category: "",
      dueDate: "",
    });
    
    setIsFormOpen(false);
  };

  const formVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { 
        duration: 0.2 
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="relative">
      {!isFormOpen ? (
        <motion.button
          onClick={() => setIsFormOpen(true)}
          className="w-full py-4 px-6 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium shadow-soft hover:shadow-lg transition-all duration-300"
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Task</span>
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6 border border-surface-200 dark:border-surface-700"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New Task</h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                aria-label="Close form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="What needs to be done?"
                  className={`input-field ${errors.title ? 'border-red-500 dark:border-red-500' : ''}`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.title}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add details about your task (optional)"
                  rows="3"
                  className="input-field resize-none"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-4 w-4 text-surface-500" />
                    </div>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className={`input-field pl-10 ${errors.priority ? 'border-red-500 dark:border-red-500' : ''}`}
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                  {errors.priority && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.priority}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Category
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-4 w-4 text-surface-500" />
                    </div>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="input-field pl-10"
                    >
                      <option value="">Select Category</option>
                      <option value="work">Work</option>
                      <option value="personal">Personal</option>
                      <option value="shopping">Shopping</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Due Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-4 w-4 text-surface-500" />
                    </div>
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      className="input-field pl-10"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <motion.button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="btn btn-outline"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Create Task
                </motion.button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default MainFeature;