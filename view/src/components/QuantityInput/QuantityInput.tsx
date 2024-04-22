import React from "react";
import "./QuantityInput.css";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";


interface QuantityInputProps {
    quantity: number;
    setQuantity: (quantity: number) => void;
    maxQuantity?: number;
}

export const QuantityInput: React.FC<QuantityInputProps> = ({quantity, setQuantity, maxQuantity}) => {


    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const handleIncrement = () => {
        if (maxQuantity) {
             if (quantity < maxQuantity) {
            setQuantity(quantity + 1);
        } else return;
        } else {
            setQuantity(quantity + 1)
        }
       
    }

    const minQuantityReached: boolean = quantity === 1 || quantity === 0;

    const maxQuantityReached: boolean = quantity === maxQuantity

    return (
        <div className="quantity-input-container">
            <label>Quantity:</label>
            <div className="input-with-buttons">
                <button type="button" className={minQuantityReached ? "min-reached" : ""} id="decrement-button" onClick={handleDecrement}>
                    <FiMinus />
                </button>
                <input 
                 type="number"
                 name="quantity"
                 min={1}
                 max={maxQuantity} 
                 value={quantity}
                 onChange={(e) => {
                    const value = ((e.target.value === "") || (e.target.value === "0")) ? 1 : parseInt(e.target.value, 10);
                    if (!isNaN(value)) {
                      setQuantity(value);
                    }
                 }}
            />
            <button type="button" className={maxQuantityReached ? "max-reached" : ""} onClick={handleIncrement}>
                <FiPlus />
                </button>
            </div>
            

        </div>
    )
}