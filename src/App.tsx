import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './components/chat/Chat';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Assessment from './components/assessment/Assessment';
import AssessmentResults from './components/assessment/AssessmentResults';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <div className="flex-1 flex flex-col">
          <Header
            onMenuClick={() => setIsSidebarOpen(true)}
            title="AI Career Counselor"
          />
          <main className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/assessment/results" element={<AssessmentResults />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;