import React, { useState } from "react";
import SignupFormPage from "../SignupFormPage";
import './splash-page.css'
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

const SplashPage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const [signUp, setSignUp] = useState(false)
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory()
    if (sessionUser) return <Redirect to="/listings" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(() => history.push('/listings'))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    const handleDefaultButton = (e) => {

        const credential = 'Demo-lition'
        const password = 'password'

       return dispatch(sessionActions.login({ credential, password }))
            .then(() => history.push('/listings'))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    }


    return (
        <div id='splash-main'>
            <div id='splash-left'>
                <p id='left-header'>Log in to Felp</p>
                <p id='left-subheader'>New to Felp? <span onClick={() =>{ 
                    setSignUp(true)}} id='signUp-text'>Sign up</span></p>
                <p id='left-agree-terms'>By logging in, you agree to Felp's Terms of Service and Privacy Policy.</p>
                {!signUp &&
                    <>
                    <form id='splash-signup-form' onSubmit={(e) => handleSubmit(e)}>
                        {errors.map((error, idx) => (
                            <li class='error-li' key={idx}>{error}</li>
                        ))}
                        <input type='text' onChange={(e) => setCredential(e.target.value)} value={credential} className="splash-signup-input" placeholder="Email or Username" required></input>
                        <input value={password}
                            onChange={(e) => setPassword(e.target.value)} className="splash-signup-input" placeholder="Password" type='password' required></input>
                        <button id='splash-login-button' >Log In</button>
                    </form>
                    <button id='splash-login-button' onClick={(e)=> handleDefaultButton(e)}>Log In With Demo User</button>
                    </>
                }
                {signUp &&
                    <>
                        <SignupFormPage />
                        <button id="sign-up-cancel" onClick={() => {
                            setSignUp(false)
                            }}>Cancel Sign Up</button>
                    </>
                }
            </div>
            <div id='splash-right'>
                <img alt='splash page' src='https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png' />
            </div>
        </div>
    )
}


export default SplashPage
