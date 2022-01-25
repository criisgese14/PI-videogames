import { Link } from "react-router-dom"
import './videogameCard.css'
import gif from './wrS.gif' 
const VideogameCard = ({id, name, img, genres, rating}) => {
    return (
        <div className="card">
        <div key={id}>
            <div className="container-card">
            {img ? <img src={img} alt={name} className="img-card"/> : <img src={gif} alt="a" className="img-card"/>}
            { rating && <p className="rating-card">{rating} ⭐</p> }
            <Link to={`/detail/${id}`} key={id}>
                <h2 className="link-detail">Details</h2>
            </Link>
            </div>
            <h1 className="title-card">{name}</h1>
            <h2 className="genres-card"> {genres?.map(g => {
                return (
                    <span key={g} className="genre-card">{g}</span>
                )
            })}</h2>
            
        </div>
        
        </div>
    )
}

export default VideogameCard