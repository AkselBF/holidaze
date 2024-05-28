import React from "react";

export const handleNumberInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, min: number, max: number) => {
  const value = e.target.value;

  // Allow empty string or non-numeric input
  if (value === '' || !/^-?\d*$/.test(value)) {
    return; // or handle differently, e.g., display an error message
  }

  // Type guard to ensure e.target is HTMLInputElement
  if (e.target instanceof HTMLInputElement) {
    let numericValue = parseInt(value, 10);
    if (isNaN(numericValue)) {
      // Handle NaN differently, e.g., display an error message
      return;
    } else if (numericValue < 0) {
      numericValue = 0; // Treat negative values as zero
    } else if (numericValue < min) {
      numericValue = min;
    } else if (numericValue > max) {
      numericValue = max;
    }

    e.target.value = numericValue.toString();
  }
};