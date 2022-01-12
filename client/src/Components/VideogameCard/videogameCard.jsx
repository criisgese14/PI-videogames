import { Link } from "react-router-dom"
import './videogameCard.css'

const VideogameCard = ({id, name, img, genres}) => {
    return (
        <div className="carta">
        <Link to={`/detail/${id}`} key={id}>
        <div key={id}>
            <h1>{name}</h1>
            <img src={img} alt={name} className="img"/>
            <p className="generos"> {genres?.map(g => {
                return (
                    <li key={g}>{g}</li>
                )
            })}</p>
        </div>
        </Link>
        </div>
    )
}

export default VideogameCard