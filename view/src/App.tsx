import { useCallback, useState } from 'react';
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
import { selectIsAuthenticated } from './store/UserSlice';
import { useSelector } from 'react-redux';
import { useAuthorizationCheck } from './hooks/AuthorizationCheck';
import { selectBreakMinutes, selectIsPaused, selectLongBreakMinutes, selectMode, selectNumOfSessionsToLongBreak, selectPomodoros, selectSecondsLeft, selectSessionsRemaining, selectWorkMinutes } from './store/PomodoroSlice';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const callback = useCallback(() => setIsLoading(false), []);
  useAuthorizationCheck(callback);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const secondsLeft = useSelector(selectSecondsLeft);
  const isPaused = useSelector(selectIsPaused);
  const sessionsRemaining = useSelector(selectSessionsRemaining);
  const mode = useSelector(selectMode);
  const workMinutes = useSelector(selectWorkMinutes)
  const breakMinutes = useSelector(selectBreakMinutes);
  const longBreakMinutes = useSelector(selectLongBreakMinutes);
  const sessionsToLongBreak = useSelector(selectNumOfSessionsToLongBreak);
  const pomodoros = useSelector(selectPomodoros);



 
   const handleBeforeUnload = async () => {
      localStorage.removeItem('pomodoroTimerState');
      if (!isPaused) {
        const currentTime = Math.floor(Date.now() / 1000);
        const timerState = {
          secondsLeftSaved: secondsLeft,
          timeOfUnload: currentTime,
          pomodoros: pomodoros,
          sessionsRemaining: sessionsRemaining,
          mode: mode,
          totalSessions: sessionsToLongBreak,
          workMinutes: workMinutes,
          breakMinutes: breakMinutes,
          longBreakMinutes: longBreakMinutes
        };
        localStorage.setItem('pomodoroTimerState', JSON.stringify(timerState));
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload);


 

  if (isLoading) {
    return <div></div>
  }

  return (
    <BrowserRouter>
      <div className='App'>
        {isAuthenticated && <Navigation />}
        <div className={`${isAuthenticated ? 'content' : 'logged-out-content'}`}>
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
