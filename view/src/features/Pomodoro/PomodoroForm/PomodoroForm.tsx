import React, { useState } from "react";
import { FaCoins } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/Card/Card";
import { selectPomodoroPrice, selectPomodoros, sellPomodoros } from "../../../store/PomodoroSlice";
import "./PomodoroForm.css";
import tomato from "../../../images/tomato.png";
import { addToCoins } from "../../../store/RewardsSlice";
import { QuantityInput } from "../../../components/QuantityInput/QuantityInput";
import { pomodoroSale } from "../../../api/pomodoro";
import { addCoins } from "../../../api/coins";

interface PomodoroFormProps {
    hideForm: () => void;
}


export const PomodoroForm: React.FC<PomodoroFormProps> = ({ hideForm }) => {
    const pomodoros = useSelector(selectPomodoros);
    const pomodoroPrice = useSelector(selectPomodoroPrice);
    const [numOfPomodoros, setNumOfPomodoros] = useState(pomodoros);
    const priceTotal = numOfPomodoros * pomodoroPrice;
    const dispatch = useDispatch();

    const confirmPomodoroSale = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (numOfPomodoros > 0) {
            await pomodoroSale(numOfPomodoros);
            await addCoins(priceTotal);
            dispatch(addToCoins(priceTotal));
            dispatch(sellPomodoros(numOfPomodoros));
        }
        hideForm();
    }


    return (
        <Card className="pomodoro-form-container overlay-card">
            <form onSubmit={confirmPomodoroSale}>
                {numOfPomodoros > 0 && (
                    <>
                      <button
                    type="button"
                    className='close'
                    onClick={hideForm}
                >
                    X
                </button>
                        <h4>Sell Pomodoros</h4>

                        <div className="sell-label-input">

                        <QuantityInput 
                                quantity={numOfPomodoros}
                                setQuantity={setNumOfPomodoros}
                                maxQuantity={pomodoros}
                            />
                            <img src={tomato} alt="" width="24" height="24" />

                        </div>
                        {numOfPomodoros <= pomodoros ? (
                            <p>for <FaCoins className="coins-icon" />{priceTotal} </p>
                        ) : (
                            <p>You have {pomodoros} pomodoros to sell!</p>
                        )}
                        
                    </>
                )}
                {numOfPomodoros === 0 && (
                    <>
                        <p>Collect pomodoros to sell them for coins.</p>
                    </>
                )}
                <div className="command-buttons-container">
                     <button type="submit" className="command-button sell-pomodoros-button">{numOfPomodoros > 0 ? "Sell" : "Ok"}</button>
                </div>
               
            </form>
        </Card>
    )
}