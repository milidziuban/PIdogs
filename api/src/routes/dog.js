const { Router } = require('express');
const { Dog, Temperament } = require('../db')
const { conn } = require('../db')
const router = Router();
const axios = require('axios')
const { Op } = require('sequelize');
const { raw } = require('body-parser');

// [ ] GET /dogs:
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal (ocho perros)

router.get('/', (req, res) => {
    //const { skip = 0, limit = 8 } = req.query;
    axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.APIKEY_DOGS}`)
        .then(respuesta => {
            return respuesta.data.map(dog => {
                return {
                    id: dog.id,
                    image: dog.image.url,
                    name: dog.name,
                    temperament: dog.temperament,
                    weight: dog.weight.metric,
                }
            })
        })

        .then(respApi => {
            Dog.findAll({
                include: {
                    model: Temperament,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            })
                .then(dogs => {
                    const response = dogs.map(dog => {
                        const temp = dog.temperaments.map(el => {
                            return el.name
                        }).join(', ');
                        console.log(temp);
                        return {
                            id: dog.id,
                            image: dog.image,
                            name: dog.name,
                            temperament: temp,
                            weight: dog.weight,
                        }
                    }).concat(respApi)
                    //.slice(skip, limit)
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

        const response = allDogs.map(dog => {
            return {
                id: dog.id,
                image: dog.image.url,
                name: dog.name,
                temperament: dog.temperament,
                weight: dog.weight.metric,
            }
        })

        const perro = await Dog.findAll({
            attributes: ['id', 'name', 'image', 'weight',],
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        const doggy = perro.map().concat(response)

        if (doggy.length < 1) throw `No hubo coicidencias con el nombre de raza: ${name} `

        res.send(doggy)

    } catch (error) {
        res.send(error).status(400)
    }
})

// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados
// TRAER: life_span: dog.life_span, height: dog.height , weight: dog.weight,

router.get('/:idRaza', async (req, res) => {
    try {
        const { idRaza } = req.params
        const regex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

        if (regex.test(idRaza)) {
            const dogId = await Dog.findOne({
                attributes: ['id', 'name', 'life_span', 'image', 'height', 'weight',],
                where: {
                    id: [idRaza]
                },
            
                include: {
                    model: Temperament,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    },
                },
            })
                // .then((dogId) => {
                //     dogId.temperaments = dogId.temperaments.map(el => {
                //         return el.name
                //     }).join(', ')
                //     console.log(dogId);
                //     res.send(dogId)

                // })

                res.send(dogId)

        } else {
            const dogApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.APIKEY_DOGS}`);
            const detalleDog = dogApi.data.filter(dog => dog.id == idRaza)

            const response = detalleDog.map(dog => {
                return {
                    name: dog.name,
                    life_span: dog.life_span,
                    height: dog.height.metric,
                    weight: dog.weight.metric,
                    temperament: dog.temperament
                }
            })
            res.send(response)
        }


    } catch (error) {
        console.log(error);
    }

})


// [ ] POST /dogs:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos relacionada con sus temperamentos

router.post('/', async (req, res) => {
    try {
        const { name, height, weight, life_span, image, temperament } = req.body;
        const newDog = {
            name,
            height,
            weight,
            life_span,
            image,
        }
        const createdDog = await Dog.create(newDog);

        for (const temp of temperament) {
            const tempById = await Temperament.findOne({
                where: { id: temp }
            })
            if (!tempById) throw `El temperament con id = ${temp} no existe`
            await createdDog.addTemperament(tempById.id);
        }

        res.send("Dog created")
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;