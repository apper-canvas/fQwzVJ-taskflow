import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';

// Import your page components here
// e.g., import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Router>
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              {/* Define your routes here */}
              <Route path="/" element={<div className="text-center py-12">
                <h1 className="text-4xl font-bold mb-4">Welcome to Tasker</h1>
                <p className="text-xl">Your personal task management solution</p>
              </div>} />
              <Route path="/tasks" element={<div>Tasks Page</div>} />
              <Route path="/projects" element={<div>Projects Page</div>} />
            </Routes>
          </main>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;