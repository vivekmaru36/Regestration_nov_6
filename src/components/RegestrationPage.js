import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentYear: '',
    finalYear: '',
    rfidno: '',
    errors: {
      firstName: '',
      email: '',
      rfidno: '',
    },
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { firstName, email, rfidno } = state;
    const errors = {};

    // Validation for First Name
    if (!firstName) {
      errors.firstName = 'First Name is required';
    }

    // Validation for Email
    if (!email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Invalid email format';
    }

    // Validation for RFID no.
    if (!rfidno || !/^[0-9]{10}$/.test(rfidno)) {
      errors.rfidno = 'RFID no. must be 10 digits';
      // Clear the input fields for rfid when an error occurs
      setState((prevState) => ({
        ...prevState,
        rfidno: '',
      }));
    }

    // Display confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to submit the form?");

    if (isConfirmed && Object.values(errors).every(error => !error)) {
      // If there are no errors and the user confirms, proceed with the form submission
      submitForm();
    } else {
      // If there are validation errors or the user cancels, update the state with errors
      setState((prevState) => ({
        ...prevState,
        errors,
      }));
    }
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const submitForm = () => {
    // Prepare the data for submission

    // const formData = {
    //   firstName: state.firstName,
    //   lastName: state.lastName,
    //   email: state.email,
    //   currentYear: state.currentYear,
    //   finalYear: state.finalYear,
    //   rfidno: state.rfidno,
    // };
    
    navigate('/email-verification'); // Redirect after successful submission
    
    // Example: Send the form data to a server using the fetch API
    // fetch('your_server_endpoint_here', {
    //   method: 'POST', // Use the appropriate HTTP method
    //   headers: {
    //     'Content-Type': 'application/json', // Set the appropriate content type
    //   },
    //   body: JSON.stringify(formData), // Convert the data to JSON
    // })
    // .then(response => {
    //   if (response.ok) {
    //     // Successful form submission
    //     console.log('Form data submitted successfully');
    //     // You can also navigate to a thank you page or perform other actions here.
    //     navigate('/email-verification'); // Redirect after successful submission
    //   } else {
    //     // Handle errors if the submission fails
    //     console.error('Form data submission failed');
    //   }
    // })
    // .catch(error => {
    //   console.error('An error occurred:', error);
    // });
  }

  return (
    <div className='registration-page'>
      <h2>Registration Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={state.firstName}
            onChange={handleInputChange}
            required
          />
          {state.errors.firstName && <span className="error">{state.errors.firstName}</span>}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={state.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
            required
          />
          {state.errors.email && <span className="error">{state.errors.email}</span>}
        </div>
        <div>
          <label>Current Year:</label>
          <input
            type="number"
            name="currentYear"
            value={state.currentYear}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Final Year:</label>
          <input
            type="number"
            name="finalYear"
            value={state.finalYear}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>RFID no. (10 digits):</label>
          <input
            type="text"
            name="rfidno"
            value={state.rfidno}
            onChange={handleInputChange}
            required
          />
          {state.errors.rfidno && <span className="error">{state.errors.rfidno}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
