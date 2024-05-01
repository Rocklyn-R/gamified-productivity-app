import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './features/Navigation/Navigation';
import { Tasks } from './features/Tasks/TasksPage';
import { TaskHistory } from './features/Tasks/TaskHistory/TaskHistory';
import { RewardsPage } from './features/Rewards/RewardsPage';
import { InventoryPage } from './features/Inventory/InventoryPage';
import { RewardHistory } from './features/Inventory/RewardHistory/RewardHistory';
import { PomodoroPage } from './features/Pomodoro/PomodoroPage';
import { LoginPage } from './features/Authentication/Login/LoginPage';
import { SignUp } from './features/Authentication/Signup/SignupPage';
import { Profile } from './features/Profile/Profile';
import { selectIsAuthenticated, unauthenticateUser } from './store/UserSlice';
import { useSelector } from 'react-redux';
import { checkAuthentication } from './api/login';
import { authenticateUser } from './store/UserSlice';
import { useDispatch } from 'react-redux';
import { useAuthorizationCheck } from './hooks/AuthorizationCheck';
import { getPomodoro } from './api/pomodoro';
import { selectSecondsLeft, setPomodoro } from './store/PomodoroSlice';
import { usePomodoroFetch } from './hooks/PomodoroFetch';
import { pausePomodoroTimer } from './api/pomodoro';

function App() {
  usePomodoroFetch();
  const [isLoading, setIsLoading] = useState(true);
  useAuthorizationCheck(() => setIsLoading(false));
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const secondsLeft = useSelector(selectSecondsLeft);

  useEffect(() => {
    const handleBeforeUnload = async () => {
        await pausePomodoroTimer(secondsLeft);
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [secondsLeft]);


  if (isLoading) {
    return <div></div>
  }

  return (
    <BrowserRouter>
      <div className='App'>
        {isAuthenticated && <Navigation />}
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/tasks" /> : <LoginPage />}
            />
            <Route
              path="/signup"
              element={isAuthenticated ? <Navigate to="/tasks" /> : <SignUp />}
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/tasks"
              element={isAuthenticated ? <Tasks /> : <Navigate to="/login" />}
            />
            <Route
              path="/tasks/history"
              element={isAuthenticated ? <TaskHistory /> : <Navigate to="/login" />}
            />
            <Route
              path="/pomodoro"
              element={isAuthenticated ? <PomodoroPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/rewards-shop"
              element={isAuthenticated ? <RewardsPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/inventory"
              element={isAuthenticated ? <InventoryPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/inventory/history"
              element={isAuthenticated ? <RewardHistory /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>

      </div>

    </BrowserRouter>

  );
}

export default App;
