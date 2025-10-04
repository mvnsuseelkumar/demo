import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Jobs from './pages/Jobs';
import Learning from './pages/Learning';
import { auth } from './services/firebase';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        {user && <Navbar user={user} />}
        
        <Routes>
          <Route 
            path="/" 
            element={user ? <Dashboard user={user} /> : <Navigate to="/profile" />} 
          />
          <Route 
            path="/profile" 
            element={<Profile user={user} setUser={setUser} />} 
          />
          <Route 
            path="/jobs" 
            element={user ? <Jobs user={user} /> : <Navigate to="/profile" />} 
          />
          <Route 
            path="/learning" 
            element={user ? <Learning user={user} /> : <Navigate to="/profile" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;