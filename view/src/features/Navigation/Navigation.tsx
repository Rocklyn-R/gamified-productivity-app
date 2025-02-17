import React, { useEffect, useState, useRef } from 'react';
import "./Navigation.css";
import { Link, useNavigate } from 'react-router-dom';
import tomato from "../../images/tomato.png"
import { FaTasks } from "react-icons/fa";
import gift from "../../images/gift.png";
import shop from "../../images/shop.png";
import account from "../../images/account.png";
import { logoutUser } from '../../api/logout';
import { resetUserState, unauthenticateUser } from '../../store/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { pomodoroUpdateSecondsLeft, pausePlayPomodoroTimer } from '../../api/pomodoro';
import { pause, resetPomodoroState, selectSecondsLeft,  } from '../../store/PomodoroSlice';
import { resetTasksState } from '../../store/TasksSlice';
import { resetRewardsState } from '../../store/RewardsSlice';



export const Navigation = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const secondsLeft = useSelector(selectSecondsLeft)

    const handleLogout = async () => {
        dispatch(pause());
        setIsDropdownOpen(false);
        await pausePlayPomodoroTimer(true);
        await pomodoroUpdateSecondsLeft(secondsLeft);
        await logoutUser();
        dispatch(unauthenticateUser());
        dispatch(resetTasksState());
        dispatch(resetRewardsState());
        dispatch(resetPomodoroState());
        dispatch(resetUserState());
        navigate('/');
    }

    const handleViewAccount = () => {
        setIsDropdownOpen(false);
        navigate('/profile');
    }

     // Close dropdown if clicked outside
     useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside); // Listen for clicks outside

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="navbar">
            <ul>
                <li><Link to="/tasks">
                    <FaTasks className='tasks-icon' />
                    <span className="nav-text">Tasks</span>
                </Link></li>
                <li><Link to="/pomodoro">
                    <img alt="" src={tomato} width="24" height="24" />
                    <span className="nav-text">Pomodoro</span>
                </Link>
                </li>
                <li><Link to="/rewards-shop">
                    <img alt="" src={shop} width="24" height="24" className='shopping-icon' />
                    <span className="nav-text">Shop</span>
                </Link></li>
                <li><Link to="/inventory">
                    <img alt="" src={gift} width='24' height="24" className='gift-icon' />
                    <span className="nav-text">Inventory</span>
                </Link></li>
                    {/* Profile Dropdown */}
                    <div className="profile-dropdown" ref={dropdownRef}>
                        <li>
                        <button 
                        className='profile-dropdown-button'
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <img src={account} width="24" height="24" alt="Profile" />
                        </button>
                        </li>
                        {isDropdownOpen && (
                            <div className="dropdown-menu dropdown-menu-flipped">
                                    <button onClick={handleViewAccount}>
                                        View Account
                                    </button>
                        
                                    <button onClick={handleLogout}>
                                        Logout
                                    </button>
                            </div>
                        )}
                    </div>
                
            </ul>
        </header>
    )
}