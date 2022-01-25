import { Link } from 'react-router-dom';
import img from './landingImg3.jpg'
import './landingPage.css'
export const LandingPage = () => {
    return (
        <div className='landingPage'>
            <img src={img} alt='img' className='landingImg'/>
            <h1 className='landingTitle'> PI VIDEOGAMES</h1>
            <Link to='/home'>
                <button className='button-home'>Home</button>
            </Link>
        </div>
    );
};

