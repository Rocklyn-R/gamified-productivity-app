import React, { useState } from 'react';
import "./Navigation.css";
import { Link, useNavigate } from 'react-router-dom';
import tomato from "../../images/tomato.png"
import { FaTasks } from "react-icons/fa";
import gift from "../../images/gift.png";
import shop from "../../images/shop.png";
import account from "../../images/account.png";
import { logoutUser } from '../../api/logout';
import { unauthenticateUser } from '../../store/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { pausePomodoroTimer } from '../../api/pomodoro';
import { selectSecondsLeft } from '../../store/PomodoroSlice';



export const Navigation = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const secondsLeft = useSelector(selectSecondsLeft)

    const handleLogout = async () => {
        await pausePomodoroTimer(secondsLeft);
        setIsDropdownOpen(false);
        await logoutUser();
        dispatch(unauthenticateUser());
        navigate('/');
    }

    const handleViewAccount = () => {
        setIsDropdownOpen(false);
        navigate('/profile');
    }

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
                 <li>
                    {/* Profile Dropdown */}
                    <div className="profile-dropdown">
                        <button 
                        className='profile-dropdown-button'
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <img src={account} width="24" height="24" alt="Profile" />
                        </button>
                        {isDropdownOpen && (
                            <ul className="dropdown-menu">
                                <li className="drop-down-li">
                                    <button onClick={handleViewAccount}>
                                        View Account
                                    </button>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </li>
            </ul>
        </header>
    )
}