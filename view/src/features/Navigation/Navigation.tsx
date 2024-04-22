import React from 'react';
import "./Navigation.css";
import { Link } from 'react-router-dom';
import tomato from "../../images/tomato.png"
import { FaTasks } from "react-icons/fa";
import gift from "../../images/gift.png";
import shop from "../../images/shop.png";




export const Navigation = () => {
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
                
            </ul>
        </header>
    )
}