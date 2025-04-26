import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : 
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 right-0 z-50 p-4">
        <motion.button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-surface-600" />
          )}
        </motion.button>
      </header>

      <main className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="py-4 text-center text-sm text-surface-500 dark:text-surface-400">
        <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;