import React, { Component } from 'react';
import './App.css';

class RegistrationPage extends Component {
  constructor() {
    super();
    this.state = {
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
      }
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, email, rfidno } = this.state;
    const errors = {};

    // Validation for First Name
    if (!firstName) {
      errors.firstName = 'First Name is required';
    }

    // Validation for Email
    if (!email) {
      errors.email = 'Email is required';
    } else if (!this.isValidEmail(email)) {
      errors.email = 'Invalid email format';
    }

    // Validation for RFID no.
    if (!rfidno || !/^[0-9]{10}$/.test(rfidno)) {
      errors.rfidno = 'RFID no. must be 20 digits';
    }

    // Display confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to submit the form?");

    if (isConfirmed && Object.values(errors).every(error => !error)) {
      // If there are no errors and the user confirms, proceed with the form submission
      this.submitForm();
    } else {
      // If there are validation errors or the user cancels, update the state with errors
      this.setState({ errors });
    }
  }

  isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  submitForm = () => {
    // Prepare the data for submission
    const formData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      currentYear: this.state.currentYear,
      finalYear: this.state.finalYear,
      rfidno: this.state.rfidno
    };

    // Example: Send the form data to a server using the fetch API
    fetch('your_server_endpoint_here', {
      method: 'POST', // Use the appropriate HTTP method
      headers: {
        'Content-Type': 'application/json', // Set the appropriate content type
      },
      body: JSON.stringify(formData), // Convert the data to JSON
    })
      .then(response => {
        if (response.ok) {
          // Successful form submission
          console.log('Form data submitted successfully');
          // You can also navigate to a thank you page or perform other actions here.
        } else {
          // Handle errors if the submission fails
          console.error('Form data submission failed');
        }
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h2>Registration Page</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleInputChange}
              required
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <label>Current Year:</label>
            <input
              type="number"
              name="currentYear"
              value={this.state.currentYear}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Final Year:</label>
            <input
              type="number"
              name="finalYear"
              value={this.state.finalYear}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>RFID no. (10 digits):</label>
            <input
              type="text"
              name="rfidno"
              value={this.state.rfidno}
              onChange={this.handleInputChange}
              required
            />
            {errors.rfidno && <span className="error">{errors.rfidno}</span>}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default RegistrationPage;