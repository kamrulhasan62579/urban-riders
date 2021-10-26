import React, { useState } from 'react';
import './Destination.css'
import { useParams } from 'react-router-dom';
import motors from '../../fakeData/fakeData';
import img1 from '../../images/Frame.png'
import img2 from '../../images/Frame-2.png'
import img3 from '../../images/Frame-1.png'
import img4 from '../../images/Group.png'
import Map from '../Map/Map';
import { useForm } from "react-hook-form";

const Destination = () => {

      const { register, handleSubmit, watch, formState: { errors } } = useForm();
       const onSubmit = data => console.log(data);

     const {title} = useParams();
     console.log(title);
     const vehicle = motors.find(moto => moto.title = title)
    let imgThumb;
    if (title === 'Bike') {
        imgThumb = <img src={img1} alt=""/>
    }
    if (title === 'Car') {
        imgThumb = <img src={img2} alt=""/>
    }
    if (title === 'Bus') {
        imgThumb = <img src={img3} alt=""/>
    }
    if (title === 'Train') {
        imgThumb = <img src={img4} alt=""/>
    }
     console.log(vehicle);
    return (
        <div style={{padding: "30px"}} className="destin text-center p-5">
           {
               imgThumb
           }
           <h4 className="text-center p-3">Vehicle Type: {vehicle.title}</h4>
           <Map vehicle={vehicle}></Map>
        </div>
    );
};

export default Destination;