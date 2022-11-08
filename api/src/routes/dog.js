const { Router } = require('express');
const { Dog } = require('../db')
const router = Router();
const axios = require('axios')

// const router = Router();

// [ ] GET /dogs:
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal

router.get('/', (req, res) => {
    const { skip = 0, limit = 8 } = req.query;
    axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.APIKEY_DOGS}`)
        .then(respuesta => {
            return respuesta.data.map(dog => {
                return {
                    id: dog.id,
                    image: dog.image.url,
                    name: dog.name,
                    temperament: dog.temperament,
                    weight: dog.weight.metric,
                    life_span: dog.life_span,
                }
            })
        })
        .then(respApi => {
            Dog.findAll()
                .then(dogs => {
                    const response = dogs.map(dog => {
                        return {
                            id: dog.id,
                            image: dog.image,
                            name: dog.name,
                            temperament: dog.temperament,
                            weight: dog.weight,
                            life_span: dog.life_span,
                        }
                    }).concat(respApi).slice(skip, limit)
                    res.send(response)
                })
        })
        .catch(error => {
            console.log(error)
        })
})


// [ ] GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado

router.get('/search', async (req, res) => {
    try {
        const { name } = req.query
        const dogApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.APIKEY_DOGS}`)
        const allDogs = dogApi.data.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
        return res.send(allDogs)
    } catch (error) {
        console.log(error)
    }
})



// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados
router.get('/:idRaza', async (req, res) => {
    try {
        const { idRaza } = req.params
        const dogApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.APIKEY_DOGS}`)
        const detalleDog = dogApi.data.find(dog => dog.id == idRaza)
        return res.send(detalleDog)
    } catch (error) {
        console.log(error)
    }

})


// [ ] POST /dogs:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos relacionada con sus temperamentos

router.post('/', (req, res) => {
    try {
        const { id, name, height, weight, life_span, image, temperament } = req.body;
        Dog.create({
            id,
            name,
            height,
            weight,
            life_span,
            image,
            temperament
        })
        res.send("Dog created")
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;