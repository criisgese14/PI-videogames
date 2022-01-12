import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom";
import { clearDetail, getVideogameDetail } from "../../Redux/Actions";
import { Loader } from "../Loader/loader";


export const VideogameDetail = () => {
    const dispatch = useDispatch();
    const videogame = useSelector(state => state.videogame)
    const loader = useSelector(state => state.loader)
    let {id} = useParams();
    useEffect(() => {
        dispatch(getVideogameDetail(id));
        return () => {
            dispatch(clearDetail())
            //dispatch(loaderTrue())
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
        {loader ? <Loader/> :
        <div key={id}>
            <Link to='/home'>
                <button>Back</button>
            </Link>
            <h1> Detalles del videojuego</h1>
            <h2>Nombre: {videogame.name}</h2>
            <img src={videogame.img} alt={videogame.name}/>
            <p>Description: {videogame.description}</p>
            <h3>Released: {videogame.released}</h3>
            <h3>Rating: {videogame.rating}</h3>
            <h3>Platforms: </h3>
            {videogame.platforms?.map(p => {
                return (
                    <h3 key={p}>{p}</h3>
                )
            })}
            <h3>Genres: </h3>
            {videogame.genres?.map(p => {
                return(  
                    <h3 key={p.name}>{p.name}</h3>
                )
            })}

        </div>
        }
        </div>
    )
}