import React from 'react';
import { useHistory } from 'react-router-dom';
import './Motor.css'

const Motor = (props) => {
    const {id, img, title} = props.motor;
    const history = useHistory();
    const handleClick = (title) =>{
         history.push(`/destination/${title}`)
    }
    return (
        <div onClick={() =>handleClick(title)} className="img-div">
            <img src={img} alt=""/>
            <h4>{title}</h4>
        </div>
    );
};

export default Motor;