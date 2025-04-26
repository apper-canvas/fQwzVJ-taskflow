import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <TaskProvider>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </TaskProvider>
    </Router>
  );
}

export default App;