import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home as HomeIcon } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-surface-200 dark:text-surface-800">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-surface-800 dark:text-surface-200">Page Not Found</h1>
          </div>
        </div>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            <HomeIcon size={18} />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;