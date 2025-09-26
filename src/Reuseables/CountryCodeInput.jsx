// src/components/CountryCodeInput.js

import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import the default styles
import "./CountryCodeInput.css"; // We'll create this for custom styling

// This is a simple "wrapper" component
const CountryCodeInput = ({ value, onChange, placeholder }) => {
  return (
    <PhoneInput
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      // You can add more props here for customization if needed
      // e.g., defaultCountry="US"
      defaultCountry="PK"
      international
    />
  );
};

export default CountryCodeInput;
