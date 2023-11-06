import React, { useState } from 'react';

function FourDigitNumberInput() {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Check if the input value is a 4-digit number
    const isFourDigitNumber = /^\d{4}$/.test(value);

    setInputValue(value);
    setIsValid(isFourDigitNumber);
  };

  return (
    <div>
      <label>
        Enter a 4-digit number:
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="1234"
        />
      </label>
      {!isValid && <p className="error-text">Please enter a valid 4-digit number.</p>}

      <div>
        <button>pres mee</button>
      </div>
    </div>
  );
}

export default FourDigitNumberInput;