import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Members from './pages/Members';
import Relations from './pages/Relations';
import Statistics from './pages/Statistics';
import MemberView from './pages/MemberView';
import MemberEdit from './pages/MemberEdit';
import MemberAdd from './pages/MemberAdd';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import EventAdd from './pages/EventAdd';
import { BranchProvider } from './BranchContext';

function App() {
  return (
    <BranchProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/members" element={<Members />} />
              <Route path="/members/add" element={<MemberAdd />} />
              <Route path="/members/view/:id" element={<MemberView />} />
              <Route path="/members/edit/:id" element={<MemberEdit />} />
              <Route path="/relations" element={<Relations />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/add" element={<EventAdd />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/statistics" element={<Statistics />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BranchProvider>
  );
}

export default App; 