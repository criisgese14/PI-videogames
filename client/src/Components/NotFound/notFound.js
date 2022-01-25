import img from './notFound-img.png'
import './notFound.css'
export const NotFound = () => {
    return (
        <div>
            <h1 className='title-notFound'>Videogame not found :c</h1>
            <img src={img} alt='notFound' className='img-notFound'/>
        </div>
    )
}