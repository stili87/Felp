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
  let [picSrc, setPicSrc] = useState('')
  

  if (sessionUser) return <Redirect to="/listings" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      if(!picSrc) picSrc = 'https://www.hrlact.org/wp-content/uploads/2020/12/generic-user-icon.jpg'
      return dispatch(sessionActions.signup({ email, username, password, biography, fullName, picSrc }))
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
          placeholder='e.g. John Smith'
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
          placeholder='e.g. john@gmail.com'
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
          placeholder='e.g. John321'
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
            placeholder='Short Blurb about you.'
            required
        />
        <label>
        Profile Picture Url
        </label>
        <input 
            rows='50'
            className="sign-up-input"
            type='text'
            value={picSrc}
            onChange={(e) => setPicSrc(e.target.value)}
            placeholder='Optional'
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
