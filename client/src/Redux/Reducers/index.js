import { CLEAR_DETAIL, CREATED_OR_EXIST, FILTER_BY_GENRE, GET_ALL_GENRES, GET_ALL_VIDEOGAMES, GET_VIDEOGAMES_BY_NAME, GET_VIDEOGAME_DETAIL, LOADER, ORDER_BY, POST_VIDEOGAME } from "../Actions"


const initialState = {
    videogames : [],
    filterVideogames: [],
    videogames2: [],
    videogame: [],
    genres: [],
    loader: true,
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                filterVideogames: action.payload,
                videogames2: action.payload,
                loader: false
            }
        case GET_VIDEOGAMES_BY_NAME:
            return {
                ...state,
                videogames: action.payload,
                filterVideogames: action.payload,
                loader: false
            }
        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogame: action.payload,
                loader: false,
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                videogame: []
            }
        case GET_ALL_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case ORDER_BY:
            let orderGames = state.filterVideogames;
            if (action.payload === 'Default'){
                orderGames = state.videogames; 
            }
            if (action.payload === 'Ascendente'){
                orderGames = state.filterVideogames.sort( (a, b) => {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    return 0;
                });
            }
            if (action.payload === 'Descendente'){
                orderGames = state.filterVideogames.sort( (a, b) => {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                    return 0
                })
            }
            if (action.payload === 'Rating +'){
                orderGames = state.filterVideogames.sort( (a, b) => {
                    if(a.rating > b.rating) return -1;
                    if(a.rating < b.rating) return 1;
                    return 0
                })
            }
            if (action.payload === 'Rating -'){
                orderGames = state.filterVideogames.sort( (a, b) => {
                    if(a.rating > b.rating) return 1;
                    if(a.rating < b.rating) return -1;
                    return 0 
                })
            }
            return {
                ...state,
                videogames2: orderGames
            }
        case CREATED_OR_EXIST:
            const allVideogame = state.filterVideogames;
            const filterCreated = action.payload === 'Todos' ? allVideogame : allVideogame.filter(game => typeof game.id === action.payload);
            return {
                ...state,
                videogames: filterCreated
            }
        case FILTER_BY_GENRE:
            const jueguitos = state.filterVideogames
            const typeFiltered = action.payload === 'Todos' ? jueguitos : jueguitos.filter(game => game.genres.includes(action.payload)); 
            return {
                ...state,
                videogames: typeFiltered
            }
        case POST_VIDEOGAME:
            return {
                ...state
            }
        case LOADER:
            return {
                ...state,
                loader: true
            }
        default:
            return state;
    }
}

export default rootReducer;