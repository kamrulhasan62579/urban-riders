import React, { useState } from 'react';
import './Home.css'
import motors from '../../fakeData/fakeData';
import Motor from '../Motor/Motor';

const Home = () => {
    const [moto, setMoto] = useState(motors)
    console.log(moto);
    return (
        <div className="home-content">
            {
                moto.map(mot => <Motor key={mot.id} motor={mot}></Motor> )
            }
        </div>
    );
};

export default Home;