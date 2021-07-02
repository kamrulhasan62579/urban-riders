import React, { useState } from 'react';
import './Destination.css'
import { useParams } from 'react-router-dom';
import motors from '../../fakeData/fakeData';

const Destination = () => {
     const {id} = useParams();
     console.log(id);
     const vehicle = motors.find(moto => moto.id = id)
    //  const pd = fakeData.find(pd => pd.key === product.key)
     console.log(vehicle);
    return (
        <div className="destin">
           <img src={vehicle.img} alt=""/>
           <h4>{vehicle.title}</h4>
        </div>
    );
};

export default Destination;