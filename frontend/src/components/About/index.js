import './about.css'

const About = () => {
    return (
        <div className='about-outer-container'>
            <p className='about-header'>About Felp</p>
            <div className='about-developer'>
                <img className='about-image' src='./andrew.png'></img>
                <p className='developer-info'>Developed by Andrew Stilinovic</p>
                <a href='https://github.com/stili87/Felp' target='_blank' className='developer-link'>Github</a>
                <a href='https://www.linkedin.com/in/andrew-stilinovic-94277180/' target='_blank' className='developer-link'>LinkedIn</a>
            </div>
            <div className='tech-div'>
                <p className='tech-header'>Technologies Used</p>
                <a className="developer-link" href='https://expressjs.com/en/api.html' target='_blank'>Express</a>
                <a className="developer-link" href='https://reactjs.org/docs/getting-started.html' target='_blank'>React Documentation</a>
                <a className="developer-link" href='https://redux.js.org/' target='_blank'>Redux Documentation</a>
            </div>
        </div>
    )
}

export default About
