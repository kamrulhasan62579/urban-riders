import React from 'react';
import { useHistory } from 'react-router-dom';
import './Motor.css'

const Motor = (props) => {
    const {id, img, title} = props.motor;
    const history = useHistory();
    const handleClick = (id) =>{
         history.push(`/destination/${id}`)
    }
    return (
        <div onClick={() =>handleClick(id)} className="img-div">
            <img src={img} alt=""/>
            <h4>{title}</h4>
        </div>
    );
};

export default Motor;