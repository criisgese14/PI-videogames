import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createVideogame, getAllGenres, getAllPlatforms, loaderTrue } from "../../Redux/Actions";
import './createVideogame.css'
import {Loader} from '../Loader/loader'

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name is required'
    }  
    if (!input.description) {
        errors.description = 'Desciption is required'
    } 
    if (input.platforms.length < 1) {
        errors.platforms = 'Select platforms'
    }
    if (input.rating > 5 || input.rating < 0 ) {
        errors.rating = 'Select a number beetwen 0 and 5'
    }
    return errors;
}


export const CreateVideogame = () => {

    const dispatch = useDispatch()
    const genres = useSelector(state => state.genres)
    const platforms = useSelector(state => state.platforms)
    const loader = useSelector(state => state.loader)
    useEffect(() => {
        dispatch(getAllGenres())
        dispatch(getAllPlatforms())
        return () => {
            dispatch(loaderTrue())
        }
        // eslint-disable-next-line
    }, [])
    const history = useHistory()
    const [errors, setErrors] = useState({})
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
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }))
    }
    
    function handlePlatforms(e) {
        if (e.target.value !== 'None' && !input.platforms.includes(e.target.value)){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        setErrors(validate({
            ...input,
            platforms: [...input.platforms, e.target.value]
        }))
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
        if (e.target.value !== 'None' && !input.genres.includes(e.target.value)){
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
        alert("Videogame Created");
        setInput({
                name: "",
                description: "",
                released: "",
                rating: '',
                platforms: [],
                genres: []
            });
        history.push("/home");
    }
    console.log(platforms)
    console.log(input)
    console.log(errors)
    return (
        <div>
            {loader ? <Loader/> :
            <div>
            <Link to='/home'><button className="back-boton">Back</button></Link>
            <h1 className="title-form">Create Videogame</h1>
            <form onSubmit={e => handleSubmit(e)} className="form">
                <div className="input-container">
                <div>
                <label className="title-form">Name(*) </label>
                <input placeholder="Name..." name="name" value={input.name} onChange={e => handleChange(e)} className="input-form"></input>
                {errors.name && (<p className="error">{errors.name}</p>)}
                </div>
                <div>
                <label className="title-form">Released </label>
                <input type='date' name="released" value={input.released} onChange={e => handleChange(e)} className="input-form"></input>
                </div>
                <div>
                <label className="title-form">Rating </label>
                <input type='number' placeholder="Rating..." name="rating" value={input.rating} onChange={e => handleChange(e)} className="input-form"></input>
                {errors.rating && <p className="error">{errors.rating}</p>}
                </div>
                </div>
                <div className="select-container">
                <div className="container-PyG">
                <div>
                <p className="title-form">Platforms(*): </p>
                <select onChange={e => handlePlatforms(e)} className="select-PyG">
                    <option>None</option>
                    {platforms.map(p => {
                        return <option key={p.name} value={p.name}>{p.name}</option>
                    })}
                </select>
                {errors.platforms && (<p className="error">{errors.platforms}</p>)}
                </div>
                <div className="container-etiqueta">
                {input.platforms.map(p => {
                    return (
                        <div key={p} className="select-etiqueta">
                            <p className="title-etiqueta">{p}</p>
                            <button className="delete-etiqueta" onClick={e => deletePlatform(e)} value={p}> x </button>
                        </div>
                    )
                })}
                </div>
                </div>
                <div className="container-PyG">
                <div>
                <p className="title-form">Genres </p>
                <select onChange={e => handleGenres(e)} className="select-PyG">
                <option> None </option>
                    {genres.map(g => {
                        return (
                            <option key={g.name} value={g.name}>{g.name}</option>
                        )
                    })}
                </select>
                </div>
                <div className="container-etiqueta">
                {input.genres.map(g => {
                    return (
                        <div key={g} className="select-etiqueta">
                            <p className="title-etiqueta"> {g} </p>
                            <button className="delete-etiqueta" key={g} onClick={ e => deleteGenre(e)} value={g}>x</button>
                        </div>
                            )})}

                </div>
                </div>
                </div>
                
                <label className="title-form">Description(*): </label>
                <textarea placeholder="Description..." name="description" value={input.description} onChange={e => handleChange(e)}></textarea>
                {errors.description && (<p className="error">{errors.description}</p>)}
                {errors.name || input.platforms.length === 0 || errors.description || errors.rating ? <button className="boton-disabled" disabled>Create</button> : <button className="boton-crear">Create</button>} 
                
            </form>
            </div>
        }
        </div>
    )
}