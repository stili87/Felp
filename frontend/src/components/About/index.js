import './about.css'

const About = () => {
    return (
        <div className='about-outer-container'>
            <p className='about-header'>About Felp</p>
            <div className='about-developer'>
                <img alt='developer' className='about-image' src='./andrew.png'></img>
                <p className='developer-info'>Developed by Andrew Stilinovic</p>
                <p className='developer-info-sub'>Felp is a Yelp clone that allows users to find a business for whatever good or service they are looking for. It is my first attempt at building a full stack web application from scratch using a variety of technologies.</p>
                <p className='developer-info-sub'> If you are looking for a passionate, hardworking web developer please checkout my resume or other sites listed below.  Thank you for stopping by!</p>
                <div className='my-links'>
                <p className='my-links-header'>Links To My Information</p>
                <a rel="noreferrer" href='https://github.com/stili87/Felp' target='_blank' className='developer-link'>Github</a>
                <a rel="noreferrer" href='https://www.linkedin.com/in/andrew-stilinovic-94277180/' target='_blank' className='developer-link'>LinkedIn</a>
                <a rel="noreferrer" href='http://www.andrew-stilinovic.com/' target='_blank' className='developer-link'>My Portfolio</a>
                <a rel="noreferrer" href='https://better-reads-aa.herokuapp.com/' target='_blank' className='developer-link'>Better Reads - A Good Reads Clone</a>
                <a rel="noreferrer" href='https://clear-bnb.herokuapp.com/' target='_blank' className='developer-link'>Clear Bnb - An Air-Bnb Clone</a>
                </div>
                

            </div>
            <div className='tech-div'>
                <p className='tech-header'>Technologies Used</p>
                <a rel="noreferrer" className="developer-link" href='https://expressjs.com/en/api.html' target='_blank'>Express</a>
                <a rel="noreferrer" className="developer-link" href='https://reactjs.org/docs/getting-started.html' target='_blank'>React </a>
                <a rel="noreferrer" className="developer-link" href='https://redux.js.org/' target='_blank'>Redux</a>
                <a rel="noreferrer" className="developer-link" href='https://sequelize.org/' target='_blank'>Sequelize</a>
            </div>
        </div>
    )
}

export default About
