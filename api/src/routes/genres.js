const {Router} = require('express');
const axios = require('axios');
const { Genre } = require('../db')
const router = Router();

router.get('/', async function (req, res) {
    try {
        let genresDb = await Genre.findAll();
        if (!genresDb.length){
            let llamado = await axios.get(`https://api.rawg.io/api/genres?key=0693a90a055747698f5106853c37114f`)
            let generos = llamado.data.results?.map(g => {
                return {name: g.name};
            })
            await Genre.bulkCreate(generos); //agrego a base de datos, a la tabla Genre
            res.send(generos);
        }
        res.send(genresDb);
    } catch (error) {
        console.log('fallo get de genres ' + error)
    }
})

module.exports = router;