import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from "react";
import { filterByCreatedOrExist, filterByGenre, getAllGenres, getAllVideogames, orderBy, loaderTrue } from "../../Redux/Actions";
import { Nav } from '../Nav/nav';
import Paginado from '../Paged/paged';
import { Loader } from '../Loader/loader';
import { VideogamesCards } from '../VideogamesCards/videogamesCards';
import './videogames.css'
import { NotFound } from '../NotFound/notFound';

export const Videogames = () => {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.loader)
    const allVideogames = useSelector(state => state.videogames)
    // eslint-disable-next-line
    const [order, setOrder] = useState("");
    useEffect(() =>{
        dispatch(getAllVideogames())
        dispatch(getAllGenres())
        return () => {
            dispatch(loaderTrue())
        }
    // eslint-disable-next-line
    },[]);

    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage // 15 
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage // 0
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
    const countVideogames = allVideogames.length > 0 ? true : false;

    function paginado(pageNumber){
        setCurrentPage(pageNumber)
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderBy(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
        console.log(e.target.value);
    }

    function handleFilterGenres(e) {
        e.preventDefault();
        dispatch(filterByGenre(e.target.value));
        setCurrentPage(1)
        console.log(e.target.value)
    }

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterByCreatedOrExist(e.target.value));
        console.log(e.target.value)
    }
    
    function habdleRefresh(e){
        e.preventDefault()
        dispatch(getAllVideogames())
        dispatch(getAllGenres())
        dispatch(loaderTrue())
        setCurrentPage(1)

    }

    return (

        <div>
            <Nav sort={handleSort} filterGenres={handleFilterGenres} filterCreated={handleFilterCreated} setCurrentPage={setCurrentPage} refresh={habdleRefresh}></Nav>
            {loader ? <Loader/> :
            <div>
            {countVideogames ? <div>
                <Paginado videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} paginado={paginado}></Paginado>
                <div className='cards'>
                <VideogamesCards allVideogames={currentVideogames}/>
                </div>
                <Paginado videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} paginado={paginado}></Paginado>
                </div>  : <NotFound/>} 
            </div>    
            }
        </div>
    )
}
