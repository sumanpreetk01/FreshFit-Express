import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import "./css/signup.css";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
        address: formState.address,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="signup-container">
      <Link className="login-link" to="/login">
        Already have an account? Login
      </Link>

      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            className="input-field"
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            className="input-field"
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            className="input-field"
            placeholder="123 Main St"
            name="address"
            type="text"
            id="address"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            className="input-field"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pwd">Password</label>
          <input
            className="input-field"
            placeholder="Enter a password"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="submit-button" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
