import { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { useAuthorizationCheck } from './hooks/AuthorizationCheck';
import { selectBreakMinutes, selectIsPaused, selectLongBreakMinutes, selectMode, selectNumOfSessionsToLongBreak, selectSecondsLeft, selectSessionsRemaining, selectWorkMinutes } from './store/PomodoroSlice';
import { pomodoroUpdateSecondsLeft, skipTimerUpdate } from './api/pomodoro';
import { setSecondsLeft, skip } from './store/PomodoroSlice';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useAuthorizationCheck(() => setIsLoading(false));
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const secondsLeft = useSelector(selectSecondsLeft);
  const dispatch = useDispatch();
  const isPaused = useSelector(selectIsPaused);
  const sessionsRemaining = useSelector(selectSessionsRemaining);
  const mode = useSelector(selectMode);
  const workMinutes = useSelector(selectWorkMinutes)
  const breakMinutes = useSelector(selectBreakMinutes);
  const longBreakMinutes = useSelector(selectLongBreakMinutes);
  const sessionsToLongBreak = useSelector(selectNumOfSessionsToLongBreak);

  

    const handleBeforeUnload = async () => {
      localStorage.removeItem('pomodoroTimerState');
      if (!isPaused) {
        const currentTime = Math.floor(Date.now() / 1000);
        const timerState = {
          secondsLeft: secondsLeft,
          timeOfUnload: currentTime
        };
        localStorage.setItem('pomodoroTimerState', JSON.stringify(timerState))
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)



    const handleLoad = async () => {
        const savedTimerState = localStorage.getItem('pomodoroTimerState');
        if (savedTimerState) {
          const { secondsLeft, timeOfUnload } = JSON.parse(savedTimerState);
          const currentTime = Math.floor(Date.now() / 1000);
          const newSecondsLeft = secondsLeft - (currentTime - timeOfUnload)
          console.log('WORKING', newSecondsLeft);
          if (newSecondsLeft > 0) {
            dispatch(setSecondsLeft(newSecondsLeft));
            await pomodoroUpdateSecondsLeft(newSecondsLeft);
          } else {
            dispatch(skip());
            await pomodoroUpdateSecondsLeft(newSecondsLeft);
            await skipTimerUpdate(
              sessionsRemaining,
              mode,
              workMinutes,
              breakMinutes,
              longBreakMinutes,
              sessionsToLongBreak
          )
          }
        }
      }
    window.addEventListener('load', handleLoad);


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
