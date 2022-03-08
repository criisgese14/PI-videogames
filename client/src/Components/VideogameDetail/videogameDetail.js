import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom";
import { clearDetail, getVideogameDetail } from "../../Redux/Actions";
import { Loader } from "../Loader/loader";
import gif from '../VideogameCard/wrS.gif'
import './videogameDetail.css'

export const VideogameDetail = () => {
    const dispatch = useDispatch();
    const videogame = useSelector(state => state.videogame)
    const loader = useSelector(state => state.loader)
    let {id} = useParams();
    useEffect(() => {
        dispatch(getVideogameDetail(id));
        return () => {
            dispatch(clearDetail())
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
        {loader ? <Loader/> :
        <div key={id}>
            <Link to='/home'>
                <button className="back-boton">Back</button>
            </Link>
            <div className="card-game">
            <div className="card-detail">   
            <h2 className="title-detail">{videogame.name}</h2>
            {videogame.img ? <img src={videogame.img} alt={videogame.name} className="img-detail"/> : <img src={gif} alt="a" className="img-detail"/>}
            <div className="container-detail-RyR">
            <h3 className="detail-RyR">Released: {videogame.released}</h3>
            <h3 className="detail-RyR">Rating: {videogame.rating}</h3>
            </div>
            <h4 className="description-detail">{videogame.description}</h4>
            </div>
            
            <div className="container-detail-PyG">
            <div className="detail-PyG">
            <h3 className="title-detail">Platforms </h3>
            {videogame.platforms?.map(p => {
                return (
                    <h3 key={p}>{p}</h3>
                )
            })}
            </div>
            <div className="detail-PyG">
            <h3 className="title-detail">Genres </h3>
            {videogame.genres?.map(p => {
                return(  
                    <h3 key={p.name}>{p.name}</h3>
                )
            })}
            </div>
            </div>
        </div>
        </div>
        }
        </div>
    )
}
