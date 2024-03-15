import React, { useEffect, useState, useCallback } from "react";

export const InputQuantity = ({ quantity, setQuantity, maxQuantity }) => {
  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
      console.log(213);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="input_quantity">
      <button type="button" onClick={handleDecrement}>
        -
      </button>
      <input type="number" value={quantity} readOnly max={10} />
      <button type="button" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

export const InputForm = ({
  register,
  placeholder,
  type,
  className,
  autoComplete,
  disabled,
}) => {
  return (
    <input
      type={type}
      {...register}
      placeholder={placeholder}
      className={`w-full h-12 border border-gray-300 border-solid rounded-lg p-3 pl-[20px] text-base  ${
        disabled ? "text-opacity-80" : "text-opacity-100"
      } + ${className} `}
      style={{ "--tw-ring-color": "rgba(0,0,0,0.6)" }}
      autoComplete={autoComplete}
      disabled={disabled}
    />
  );
};
