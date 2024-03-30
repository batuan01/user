import React, { useState } from "react";

export const RadioGroupForm = ({
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="container-radio">
      <div className="radio-tile-group">
        {options?.map((option, index) => (
          <div className="input-container" key={index}>
            <input
              id={option.label.toLowerCase()}
              className="radio-button"
              type="radio"
              name="radio"
              value={option.value}
              checked={selectedOption === option.value}
              onChange={handleOptionChange}
            />
            <div className="radio-tile">
              <label
                htmlFor={option.label.toLowerCase()}
                className="radio-tile-label"
              >
                {option.label}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
