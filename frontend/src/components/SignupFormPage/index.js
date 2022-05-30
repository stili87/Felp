import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [biography, setBiography] = useState('')
  const [fullName, setFullName] = useState('')
  

  if (sessionUser) return <Redirect to="/listings" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({email, username, password, biography, fullName})
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, biography, fullName }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form id='sign-up-form' onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Full Name
        </label>
        <input
        className="sign-up-input"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      <label>
        Email
        </label>
        <input
        className="sign-up-input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      <label>
        Username
        </label>
        <input
        className="sign-up-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      <label>
        Biography
        </label>
        <textarea 
            rows='50'
            className="sign-up-textarea"
            type='text'
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            required
        />
      <label>
        Password
        </label>
        <input
        className="sign-up-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      <label>
        Confirm Password
        </label>
        <input
          className="sign-up-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      <button className="sign-up-submit-button" type="submit">Sign Up</button>
    </form>
  );
}

export default SignupFormPage;
