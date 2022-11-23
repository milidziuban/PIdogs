import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from '../store/actions';
import { Link } from "react-router-dom";
import './Detail.css'

export default function Detail() {
    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        dispatch(getById(id))
    }, [dispatch, id])

    const details = useSelector((state) => state.detailsDogs)
    console.log(details);

    const imagedefault = 'https://i.pinimg.com/originals/27/d6/33/27d6332add97c24febd69753b55b7f10.png'

    return (
        <div className="back">
            <Link to="/home">
                <button className="button_details"> Home </button>
            </Link>
            <div className="details_all">
                {
                    details.length > 0 ?
                        <div className="details">
                            <div className="details0">
                                <h2 className="nombre"> {details[0].name} </h2>
                                <h2 className="datos"> Life span: {details[0].life_span} </h2>
                                <h2 className="datos"> Height: {details[0].height} </h2>
                                <h2 className="datos"> Weight: {details[0].weight} </h2>
                                <h2 className="datos"> Temperament: {details[0].temperament ? details[0].temperament : 'temperament not found'} </h2>
                            </div>
                            <div className="details_img">
                                <img src={details[0].image ? details[0].image : imagedefault} alt='img not found' width="320px" ></img>
                            </div>
                        </div> : <p> loading... </p>
                }

            </div>
        </div>
    )
}