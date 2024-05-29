import React from "react";

export const handleNumberInput = (
  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  min: number,
  max: number,
  decimalPlaces: number = 0
) => {
  const value = e.target.value;

  if (value === '' || !/^-?\d*\.?\d*$/.test(value)) {
    return;
  }

  if (e.target instanceof HTMLInputElement) {
    let numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      return;
    } else if (numericValue < min) {
      numericValue = min;
    } else if (numericValue > max) {
      numericValue = max;
    } else if (decimalPlaces >= 0) {
      numericValue = parseFloat(numericValue.toFixed(decimalPlaces));
    }

    e.target.value = numericValue.toString();
  }
};