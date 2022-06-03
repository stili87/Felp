import { Link } from 'react-router-dom'
import './404.css'

const FourOFour = () => {
    return(
        <div className="four-container">
            404 - Page Not Found
            <Link className='four-link' to='/'>Return to Home Page</Link>
        </div>
    )
}

export default FourOFour
