import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTemperament, postDog } from '../store/actions'
import './Create.css';

function validator (input) {
    let errors = {};
    if(!input.name) {
        errors.name = 'Name is required'
    }

    return errors;
}

export default function CreaDog() {

    const dispatch = useDispatch();
    const history = useHistory();
    const allTemperaments = useSelector((state) => state.temperaments);

    const [temp, setTemp] = useState([])

    const [button, setButton] = useState(true);
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        image: "",
        temperament: [],
    })

    useEffect(() => {
        dispatch(getTemperament())
    }, [dispatch])

    useEffect(()=>{
        if (input.name.length > 0 && input.height.length > 0  && input.weight.length > 0) setButton(false)
        else setButton(true)
    }, [input, setButton]);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validator({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    const handleSelect = (e) => {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        });
        setTemp([
            ...temp,
            [e.target.id]
        ]);
        console.log([e.target.id])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postDog(input))
        alert('Dog creado')
        setInput({
            name: "",
            height: "",
            weight: "",
            life_span: "",
            image: "",
            temperament: [],
        })
        history.push('/home')
    }

    return (
        <div>
            <Link to='/home'> <button> Volver </button> </Link>
            <h1> Create Dog </h1>
            <form onSubmit={handleSubmit}>
                <div className='form'>

                    <label> Nombre: </label>
                    <input type='text' value={input.name} name='name' onChange={handleChange} />
                    {errors.name && 
                        <p className="error"> {errors.name} </p>
                    }

                    <label> Life Span: </label>
                    <input type='text' value={input.life_span} name='life_span' onChange={handleChange} />

                    <label> Height: </label>
                    <input type='text' value={input.height} name='height' onChange={handleChange} />

                    <label> Weight: </label>
                    <input type='text' value={input.weight} name='weight' onChange={handleChange} />

                    <label> Image: </label>
                    <input type='text' value={input.image} name='image' placeholder="Image URL..." onChange={handleChange} />

                    <div className={""}>
                        <h3>Select Temperaments</h3>
                    </div>

                    <select onChange={(e) => handleSelect(e)}>
                        <option disabled selected defaultValue>Seleccionar temperamento</option>
                        {allTemperaments?.map((temp) => (
                            <option id={temp.name} value={temp.id}> {temp.name} </option>
                        ))}

                    </select>

                    {input.temperament.map((el) => 
                        <div> 
                            <p> {el} </p>
                        </div>
                    )}

                    <ul className="seleccion">{temp.map((t) => t + ' ,')}</ul>

                    <button  disabled={button} input='input' className='bottoncrear' type="submit"> Create Dog </button>

                </div>
            </form>
        </div>
    )

}
// Agregar nuevos perros

// Ruta de creación de raza de perro: debe contener

// [ ] Un formulario controlado con JavaScript con los siguientes campos:
// Nombre
// Altura (Diferenciar entre altura mínima y máxima)
// Peso (Diferenciar entre peso mínimo y máximo)
// Años de vida
// [ ] Posibilidad de seleccionar/agregar uno o más temperamentos
// [ ] Botón/Opción para crear una nueva raza de perro
// Es requisito que el formulario de creación esté validado con JavaScript y no sólo con validaciones HTML. Pueden agregar las validaciones que consideren. Por ejemplo: Que el nombre de la raza no pueda contener números o símbolos, que el peso/altura mínimo no pueda ser mayor al máximo y viceversa, etc.