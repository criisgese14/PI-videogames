import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createVideogame, getAllGenres } from "../../Redux/Actions";


export const CreateVideogame = () => {

    const dispatch = useDispatch()
    const genres = useSelector(state => state.genres)
    useEffect(() => {
        dispatch(getAllGenres())
        // eslint-disable-next-line
    }, [])
    const history = useHistory()
    const [input, setInput] = useState({
        name : '',
        description : '',
        released : '',
        rating: '',
        platforms: [],
        genres: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }
    
    function handlePlatforms(e) {
        if (e.target.value !== 'Ninguno'){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        }
    }

    function deletePlatform(e) {
        setInput({
            ...input,
            platforms: input.platforms.filter(g => g !== e.target.value)
        })
    }

    function handleGenres(e) {
        console.log(e.target.value)
        if (e.target.value !== 'Ninguno'){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value],
        })
        }
    }

    function deleteGenre(e){
        setInput({
            ...input,
            genres: input.genres.filter(g => g !== e.target.value)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(createVideogame(input));
        alert("Videojuego creado");
        setInput({
                name: "",
                description: "",
                released: "",
                rating: "",
                platforms: [],
                genres: []
            });
        history.push("/home");
    }
    console.log(input.genres)
    console.log(input.platforms)
    return (
        <div>
            <Link to='/home'><button>Back</button></Link>
            <h1>Crear Videojuego</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <label>Name: </label>
                <input placeholder="Nombre" name="name" value={input.name} onChange={e => handleChange(e)}></input>
                <label>Description: </label>
                <input placeholder="Descripcion" name="description" value={input.description} onChange={e => handleChange(e)}></input>
                <label>Released: </label>
                <input type='date' placeholder="Fecha de lanzamiento" name="released" value={input.released} onChange={e => handleChange(e)}></input>
                <label>Rating: </label>
                <input type='number' placeholder="Rating" name="rating" value={input.rating} onChange={e => handleChange(e)}></input>
                <div>
                <p>Platforms: </p>
                <select onChange={e => handlePlatforms(e)}>
                    <option>Ninguno</option>
                    <option value='PC'>PC</option>
                    <option value='PS3'>PS3</option>
                    <option value='PS4'>PS4</option>
                    <option value='PS5'>PS5</option>
                    <option value='XBOX ONE'>XBOX ONE</option>
                    <option value='XBOX 360'>XBOX 360</option>
                    <option value='XBOX SERIES S/X'>XBOX SERIES S/X</option>
                    <option value='NINTENDO SWITCH'>NINTENDO SWITCH</option>
                    <option value='ANDROID'>ANDROID</option>
                    <option value='IOS'>IOS</option>
                </select>
                </div>
                {input.platforms.map(p => {
                    return (
                        <div key={p}>
                            <p>{p}</p>
                            <button onClick={e => deletePlatform(e)} value={p}> x </button>
                        </div>
                    )
                })}
                <div>
                <p>Genres: </p>
                <select onChange={e => handleGenres(e)}>
                <option> Ninguno </option>
                    {genres.map(g => {
                        return (
                            <option key={g.name} value={g.name}>{g.name}</option>
                        )
                    })}
                </select>
                </div>
                {input.genres.map(g => {
                    return (
                        <div key={g}>
                            <p> {g} </p>
                            <button key={g} onClick={ e => deleteGenre(e)} value={g}>x</button>
                        </div>
                        )})}
                <button>Crear</button>
            </form>
        </div>
    )
}