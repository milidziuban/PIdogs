const { Router } = require('express');
const { Temperament } = require('../db')
const router = Router();
const axios = require('axios')

// [ ] GET /temperaments:
// Obtener todos los temperamentos posibles
// En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

router.get('/', async (req, res) => {
    
        const temperamentos = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.APIKEY_DOGS}`);
        const temp = temperamentos.data.map(t => t.temperament).toString().split(",")
        temp.forEach(t => {
            let i = t.trim()
            Temperament.findOrCreate({
                where: { name: i }
            })
        })
        const allTemp = await Temperament.findAll();
        res.send(allTemp);
})


module.exports = router;