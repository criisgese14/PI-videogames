const {Router} = require('express');
const axios = require('axios');
const { getVideogamesById, createVideogame } = require('../controllers');
const router = Router();

router.get('/:id', async function (req, res) {
    const { id } = req.params;
    try {
        const idGame = await getVideogamesById(id);
        res.send(idGame);
    } catch (error) {
        console.log('fallo el llamado ' + error)
    }
})

router.post('/', async function (req, res) {
    const { name, description, released, rating, platforms, genres} = req.body;
    try {
        const addVideogame = await createVideogame(name, description, released, rating, platforms, genres)
        res.send(addVideogame)
    } catch (error) {
        console.log('fallo en la creacion ' + error)
    }
})

module.exports = router