import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTemperament, postDog } from '../store/actions'
import './Create.css';

function validator(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name is required*'
    }

    if (!input.height) {
        errors.height = 'Height is required*'
    }

    if (!input.weight) {
        errors.weight = 'Weight is required*'
    }
    if (isNaN(input.life_span)) {
        errors.life_span = 'Type only numbers*'
    }

    return errors;
}

export default function CreaDog() {

    const dispatch = useDispatch();
    const history = useHistory();

    const allTemperaments = useSelector((state) => state.temperaments);

    // const [temp, setTemp] = useState([])
    const [temp, setTemp] = useState(new Set())
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

    // useEffect(() => {
    //     if (input.name.length > 0 && input.height.length > 0 && input.weight.length > 0) setButton(false)
    //     else setButton(true)
    // }, [input, setButton]);

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
        setTemp(temp.add(e.target[e.target.selectedIndex].id));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            console.log('entro al handle 1');
            console.log(Object.values(input))
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
        } else {
            console.log('entro al handle 2');
            alert('Wrong or missing data')
        }
    }

    return (
        <div>
            <div className="top">
                <Link to='/home'> <button className="button_back"> Back </button> </Link>
                <h1 className="crear"> Create Dog </h1>
            </div>
            <div className="img_form">
                <div className="img">
                    <img src="https://www.pngmart.com/files/1/Dog-PNG-Image.png" width='400px'></img>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form'>

                        <label> Name: </label>
                        <input type='text' value={input.name} name='name' onChange={handleChange} />
                        {errors.name &&
                            <p className="error"> {errors.name} </p>
                        }

                        <label> Life Span: </label>
                        <input type='text' value={input.life_span} name='life_span' onChange={handleChange} />
                        {errors.life_span &&
                            <p className="error"> {errors.life_span} </p>}

                        <label> Height: </label>
                        <input type='text' value={input.height} name='height' onChange={handleChange} />
                        {errors.height &&
                            <p className="error"> {errors.height} </p>
                        }

                        <label> Weight: </label>
                        <input type='text' value={input.weight} name='weight' onChange={handleChange} />
                        {errors.weight &&
                            <p className="error"> {errors.weight} </p>
                        }

                        <label> Image: </label>
                        <input type='text' value={input.image} name='image' placeholder="Image URL..." onChange={handleChange} />


                        <label> Temperaments: </label>

                        <select className="select_create" onChange={(e) => handleSelect(e)}>
                            <option disabled selected defaultValue>Select Temperaments</option>
                            {allTemperaments?.map((temp, key) => (
                                <option key={key} value={temp.id} id={temp.name}> {temp.name} </option>
                            ))}
                        </select>

                        {temp.size > 0 ? <span className="seleccion">{Array.from(temp.values()).map((t) => t + ', ')}</span>
                            : null}

                        <button input='input' className='bottoncrear' type="submit"> Create Dog </button>

                    </div>
                </form>
            </div>
        </div>
    )

}
