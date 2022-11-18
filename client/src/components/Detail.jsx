import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from '../store/actions';
import { Link } from "react-router-dom";

export default function Detail() {
    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        dispatch(getById(id))
    }, [dispatch, id])

    const details = useSelector((state) => state.detailsDogs)
    console.log(details);

    // if(details[0]){
    //     let nameDog = details[0].name;
    //     let image = details[0].image;
    //     let heightDog = details[0].height;
    //     let weightDog = details[0].weight;
    //     let lifeSpanDog = details[0].life_span;
    // }

    const imagedefault = 'https://i.pinimg.com/originals/27/d6/33/27d6332add97c24febd69753b55b7f10.png'

    return (
        <div>
            <Link to="/home">
                <button> Home </button>
            </Link>
            <div>
                {
                    details.length > 0 ?
                        <div>
                            <h2> {details[0].name} </h2>
                            <h2> {details[0].life_span} </h2>
                            <h2> {details[0].height} </h2>
                            <h2> {details[0].weight} </h2>
                            <h2> {details[0].temperament} </h2>
                            <img src={details[0].image ? details[0].image : imagedefault} alt='img not found' width="175" ></img>
                        </div> : <p> loading... </p>
} 

            </div>
        </div>
    )
}