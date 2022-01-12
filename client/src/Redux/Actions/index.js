import axios from "axios"

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES'
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME'
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL'
export const GET_ALL_GENRES = 'GET_ALL_GENRES'
export const ORDER_BY = 'ORDER_BY'
export const CREATED_OR_EXIST = 'CREATED_OR_EXIST'
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'
export const POST_VIDEOGAME = 'POST_VIDEOGAME'
export const CLEAR_DETAIL = 'CLEAR_DETAIL'
export const LOADER = 'LOADER'

export function getAllVideogames() {
    return async dispatch => {
    try {
        const jueguitos = await axios.get('http://localhost:3001/videogames')
        dispatch({
            type: GET_ALL_VIDEOGAMES, 
            payload: jueguitos.data})    
    } catch (error) {
        console.log(error)
    }
    }
}

export function getVideogamesByName(payload){
    return async dispatch => {
        try {
            const juegos = await axios.get('http://localhost:3001/videogames?name='+ payload)
            dispatch({
                type: GET_VIDEOGAMES_BY_NAME,
                payload: juegos.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getAllGenres() {
    return async dispatch => {
        try {
            const generos = await axios.get('http://localhost:3001/genres')
            dispatch({
                type: GET_ALL_GENRES,
                payload: generos.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getVideogameDetail(id) {
    return async dispatch => {
        try {
            const juego = await axios.get(`http://localhost:3001/videogame/${id}`)
            dispatch({
                type: GET_VIDEOGAME_DETAIL,
                payload: juego.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function clearDetail(){
    return dispatch => {
        dispatch({
        type: CLEAR_DETAIL
    })}
}
export function createVideogame(newVideogame){
    console.log(newVideogame)
    return async dispatch => {
        try {
            const post = await axios.post('http://localhost:3001/videogame', newVideogame)
            dispatch({
                type: POST_VIDEOGAME,
                payload: post
            })
        } catch (error) {
            console.log('falló createVideogame ' + error)
        }
    }
}

export function orderBy(payload) {
    return dispatch => {
        dispatch({
            type: ORDER_BY,
            payload,
        });
    };
}

export function filterByGenre(payload) {
    return {
        type: FILTER_BY_GENRE,
        payload
    }
}

export function filterByCreatedOrExist(payload){
    console.log(payload)
    return dispatch => {
        dispatch({
            type: CREATED_OR_EXIST,
            payload
        })
    }
}

export function loaderTrue(){
    return dispatch => {
        dispatch({
            type: LOADER,
        })
    }
}
