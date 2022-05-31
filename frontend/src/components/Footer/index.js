import React from "react";
import { Link } from "react-router-dom";
import './footer-css.css'

const Footer = () => {


    return (
        <div id='footer-wrapper'>
            <div className="link-wrapper">
                <p className="link-title">About</p>
                <Link className="footer-link" to='/about'>About Felp</Link>
            </div>
            <div className="link-wrapper">
                <p className="link-title">GitHub</p>
                <a className="footer-link" href='https://github.com/stili87' target='_blank'>stili87</a>
            </div>
            <div className="link-wrapper">
                <p className="link-title">Express</p>
                <a className="footer-link" href='https://expressjs.com/en/api.html' target='_blank'>Express Documentation</a>
            </div>
            <div className="link-wrapper">
                <p className="link-title">React</p>
                <a className="footer-link" href='https://reactjs.org/docs/getting-started.html' target='_blank'>React Documentation</a>
            </div>
            <div className="link-wrapper">
                <p className="link-title">Redux</p>
                <a className="footer-link" href='https://redux.js.org/' target='_blank'>Redux Documentation</a>
            </div>
        </div>
    )
}

export default Footer
