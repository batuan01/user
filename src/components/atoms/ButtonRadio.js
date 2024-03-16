import { useState } from "react";
import styled from "styled-components";

const RadioInput = styled.input`
  display: none;
  background: ${(props) => props.color};
`;

const RadioSpan = styled.span`
  background: ${(props) => props.color};
`;
const RadioDiv = styled.span`
  background: ${(props) => (props.color ? props.color : "rgb(247, 247, 242)")};
  padding: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  label {
    color: #333;
    font-family: Arial, sans-serif;
    font-size: 14px;
  }
  span {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin: -1px 4px 0 0;
    vertical-align: middle;
    cursor: pointer;
    border-radius: 50%;
    border: 2px solid #ffffff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);
    background-repeat: no-repeat;
    background-position: center;
    text-align: center;
    line-height: 44px;
  }
`;

export const ButtonRadio = ({ dataColors, setSelectedColor }) => {
  const [selectColor, setSelectColor] = useState(null);
  const [checked, setChecked] = useState(null);

  return (
    <>
      <RadioDiv color={selectColor}>
        {dataColors?.map((item, index) => (
          <div key={index}>
            <RadioInput
              value={index}
              name={index}
              id={index}
              type="radio"
              onChange={() => {
                setChecked(index);
                setSelectColor(item.color);
                setSelectedColor(item.color_id);
              }}
              checked={checked === index}
              color={item.color}
            />
            <label htmlFor={index}>
              <RadioSpan color={item.color}>
                {checked === index ? <CheckIcon /> : null}
              </RadioSpan>
            </label>
          </div>
        ))}
      </RadioDiv>
    </>
  );
};

const CheckIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
      <g
        strokeLinejoin="round"
        strokeLinecap="round"
        id="SVGRepo_tracerCarrier"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g id="Interface / Check">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="#ffffff"
            d="M6 12L10.2426 16.2426L18.727 7.75732"
            id="Vector"
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};
