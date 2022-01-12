const axios = require('axios');
const { Videogame, Genre } = require('../db.js');
const { API_KEY } = process.env;
const getVideogames = async () => {
    try {
        let llamadoDb = await Videogame.findAll({ include: [{model: Genre}] });
        let llamado1 = await axios.get(`https://api.rawg.io/api/games?key=0693a90a055747698f5106853c37114f`)
        let llamado2 = await axios.get(llamado1.data.next);
        let llamado3 = await axios.get(llamado2.data.next);
        let llamado4 = await axios.get(llamado3.data.next);
        let llamado5 = await axios.get(llamado4.data.next);
        let juegos = [...llamadoDb, ...llamado1.data.results, ...llamado2.data.results, ...llamado3.data.results, ...llamado4.data.results, ...llamado5.data.results]
        let allgames = juegos?.map( g => {
            return {
                id: g.id,
                img: g.background_image,
                name: g.name,
                genres: g.genres.map(i => {
                    return i.name
                    
                }),
                rating: g.rating

        }})
        return allgames;
    } catch (error) {
        console.log('falló getVideoGames ' + error)
    }
}

const getVideogamesByName = async (name) => {
    try {
        let llamado = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=0693a90a055747698f5106853c37114f`)
        let primeros = llamado.data.results.splice(0, 15)
        let juegos = primeros?.map(g => {
            return {
                id: g.id,
                img: g.background_image,
                name: g.name,
                genres: g.genres.map(i => {
                    return i.name
                }),
                rating: g.rating
            }
        })
        return juegos;   
    } catch (error) {
    console.log('falló getVideogamesByName ' + error)       
    }
}
const getVideogamesById = async (id) => {
    let isNumber = Number(id)
    if (typeof isNumber === 'number'){
    try {
        let llamado = await axios.get(`https://api.rawg.io/api/games/${id}?key=0693a90a055747698f5106853c37114f`)
        let aux = llamado.data
        let detalles = {
            img: aux.background_image,
            name: aux.name,
            genres: aux.genres.map(g => {
                return {name: g.name}
            }),
            description: aux.description_raw,
            released: aux.released,
            rating: aux.rating,
            platforms: aux.platforms.map(p => {
                return p.platform.name
            })
            }
        return detalles
    } catch(error) {
        console.log('fallo getVideogameById ' + error)
    }
    } 
    if (id.toString().includes("-")){
        try {
            const findInDb = await Videogame.findOne({
                where: {
                    id: id,
                },
                include: [
                    {
                        model: Genre,
                    },
                ],
            });
            return findInDb;
        } catch (error) {
            console.log('fallo getVideogameByIdDb' + error)
        }
    }
}

const createVideogame = async function (name, description, released, rating, platforms, genres) {
    try {
        let newVideogame = await Videogame.create({
            name: name,
            description: description,
            released: released,
            rating: rating,
            platforms: platforms
        });
        let genresDb = await Genre.findAll({
            where: {
                name : genres
            }
        })
        await newVideogame.addGenres(genresDb);
        return newVideogame
    } catch (error) {
        console.log('falló createVideogame ' + error);
    }
}



module.exports = {
    getVideogames,
    getVideogamesByName,
    getVideogamesById,
    createVideogame
}