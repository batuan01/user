import React, { useEffect, useState, useCallback } from "react";

export const InputQuantity = ({ quantity, setQuantity, maxQuantity }) => {
  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      setQuantity(Number(quantity) + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(Number(quantity) - 1);
    }
  };
  const handleChange = (e) => {
    if (e.target.value <= maxQuantity) {
      const newValue = e.target.value.replace(/\D/g, "");
      setQuantity(newValue);
    }
  };
  return (
    <div className="input_quantity">
      <button type="button" onClick={handleDecrement}>
        -
      </button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={handleChange}
        value={quantity}
      />
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
  onChange,
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
      onChange={onChange}
    />
  );
};

export const InputFormUser = ({
  register,
  placeholder,
  type,
  className,
  autoComplete,
  disabled,
  label,
  required,
  errors,
  name,
}) => {
  return (
    <div className="w-full">
      <p className="text-[#3f4657] font-medium text-sm pb-2">
        {label} {required && <span className="text-[#ff0f0f]">*</span>}
      </p>
      <input
        type={type}
        {...register}
        placeholder={placeholder}
        className={`w-full h-12 border border-stone-400 border-solid rounded-sm p-1 pl-[20px] text-base shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-1 focus-visible:ring-offset-blue-400  ${
          disabled ? "text-opacity-80" : "text-opacity-100"
        } + ${className} `}
        style={{ "--tw-ring-color": "rgba(0,0,0,0.2)" }}
        autoComplete={autoComplete}
        disabled={disabled}
      />
      {name && errors[name] && errors[name].type === "required" && (
        <p className="text-red text-xs italic pt-1">{errors[name].message}</p>
      )}
    </div>
  );
};
