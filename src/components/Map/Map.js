import React, { useState } from 'react'
import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import {API_KEY} from './config'
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'


const allVehicle = [
   {
     rentPrice: 45,
     capacity: 14,
     name: "Car",
     img: "https://i.ibb.co/2MpGLsH/Frame-2.png"
   },
      {
     rentPrice: 25,
     capacity: 16,
     name: "Car",
     img: "https://i.ibb.co/2MpGLsH/Frame-2.png"
   },    {
     rentPrice: 38,
     capacity: 18,
     name: "Car",
     img: "https://i.ibb.co/2MpGLsH/Frame-2.png"
   },
      {
     rentPrice: 55,
     capacity: 7,
     name: "Train",
     img: "https://i.ibb.co/9YhS5h0/Group.png" 
   },
      {
     rentPrice: 55,
     capacity: 7,
     name: "Train",
     img: "https://i.ibb.co/9YhS5h0/Group.png"
   },
      {
     rentPrice: 45,
     capacity: 3,
     name: "Bike",
     img: "https://i.ibb.co/1MSJrvS/Frame.png"
   },
      {
     rentPrice: 65,
     capacity: 2,
     name: "Bike",
     img: "https://i.ibb.co/1MSJrvS/Frame.png"
   },    {
     rentPrice: 55,
     capacity: 7,
     name: "Train",
     img: "https://i.ibb.co/9YhS5h0/Group.png"
   },    {
     rentPrice: 34,
     capacity: 16,
     name: "Bus",
     img: "https://i.ibb.co/3k021dS/Frame-1.png"
   },    {
     rentPrice: 25,
     capacity: 20,
     name: "Bus",
     img: "https://i.ibb.co/3k021dS/Frame-1.png"
   }
]

const containerStyle = {
  width: '100%',
  height: '400px'
};

const position = {
  lat: 23.792496,
  lng: 90.407806
};

function Map({vehicle}) {
  console.log(vehicle);

  const [placeData, serPlaceData] = useState({});
  const [showData, setShowData] = useState({});
    console.log(showData);

  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  console.log(origin, destination);
  const [directionsResponse, setDirectionsResponse] = useState(null)

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data)
    serPlaceData(data);
    const searcedData = allVehicle.filter(ve => ve.name === vehicle.title)
    setShowData(searcedData);
  };

  return (
   <div>

   <div className="row m-0 d-flex justify-content-center pb-5">
      <form className="col-11 col-sm-10 col-md-9 col-lg-7 col-xl-6 col-xxl-5" onSubmit={handleSubmit(onSubmit)}>      
      <input placeholder="From" className="form-control" {...register("fromPlace", { required: true })} />
      {errors.fromPlace && <span>This field is required</span>} <br/>

      <input placeholder="Wish To Go" className="form-control" {...register("wishToGo", { required: true })} />
      {errors.wishToGo && <span>This field is required</span>} <br/>
      
      <input className="btn btn-primary form-control" type="submit" /> <br/>
    </form>
   </div>

  <div className="row m-0 d-flex justify-content-center pb-5">
    <div className="col-11 col-sm-10 col-md-9 col-lg-6 col-xl-4 col-xxl-4" style={{border: "3px solid red", borderRadius: "5px"}}>
     <span style={{fontSize: "20px"}}>{placeData.fromPlace}</span>  <FontAwesomeIcon style={{fontSize: "17px"}} icon={faLongArrowAltRight} />  <span style={{fontSize: "20px"}}>{placeData.wishToGo}</span>
    </div>
   <div style={{background: "#C9C0BB", color: "white", width: "100%", height: "100%", padding: "10px"}} className="row m-0 d-flex justify-content-center pb-5 pt-5">
      <div className="col-11 col-sm-10 col-md-9 col-lg-6 col-xl-4 col-xxl-4">
        { showData.length &&
          showData.map((showDat, index) => <li key={index} style={{listStyle: "none", margin: "6px", border: "2px solid green", borderRadius: "4px"}}>  {showDat.name} <img style={{height: "50px", width: "50px"}} src={showDat.img} alt=""/> Rent Price: {showDat.rentPrice} </li>)
        }
    </div>
   </div>
  </div>

    <LoadScript
      googleMapsApiKey={API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={16}
      >
   {
     origin !== '' && destination !== '' &&  <DirectionsService
     options={{ 
       destination: destination,
       origin: origin,
       travelMode: 'DRIVING'
     }}
     callback={res => {
         if (res !== null) {
           setDirectionsResponse(res)
         }
     }}
   />
   }
   
    {
      directionsResponse && <DirectionsRenderer
      options={{ 
        directions: directionsResponse
      }}
    />
    }
      </GoogleMap>
    </LoadScript>
   </div>
  )
}

export default React.memo(Map)