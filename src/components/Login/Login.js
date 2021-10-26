import React, { useContext, useState } from 'react';
import './Login.css'
import { useForm } from "react-hook-form";
import { useRef } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
 }


const Login = () => {
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    console.log(loggedInUser);
    const { register, formState: { errors }, handleSubmit, watch } = useForm({});
    const [newUser, setNewUser] = useState(false)

    const onSubmit = data => {
        console.log(data)
        if (newUser) {
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((res) => {
                setLoggedInUser(data)
                history.replace(from);
            })
            .catch((error) => {
            console.log(error.message);
            });
        }
        if (!newUser) {
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then((res) => {
              setLoggedInUser(data)  
              history.replace(from);
            })
            .catch((error) => {
               console.log(error.message);
            });
        }
    };

    const password = useRef({});
    password.current = watch("password", "");

    // implementation google sign in ----------------------------------------------
     var googleProvider = new firebase.auth.GoogleAuthProvider();
     const handleGoogleSignIn = () =>{
        firebase.auth()
        .signInWithPopup(googleProvider)
        .then((res) => {
           setLoggedInUser(res.user)
           history.replace(from);
        }).catch((error) => {
           console.log(error.message);
        });
     }
    //  implement facebook login---------------------------------------
    var facebookProvider = new firebase.auth.FacebookAuthProvider();
    const handleFacebookSignIn = () => {
        firebase
        .auth()
        .signInWithPopup(facebookProvider)
        .then((res) => {
            setLoggedInUser(res.user)
           history.replace(from);
        })
        .catch((error) => {
            console.log(error.message);
        });
    }
    return (
      <div className="login1 pt-5">
            {
                newUser ? <div className="newUser">
                    <form onSubmit={handleSubmit(onSubmit)}>
                                            <h1 style={{textAlign: 'center'}}>Sign up form</h1>
                    <label>Full name</label>
                    <br/>
                    <input className="input" {...register("fullName", { required: true })} /><br/>
                    {errors.fullName && errors.fullName.type === "required" && <span className="error">Full name is required</span>}
                    <br/> 
                    <label>Email</label>
                    <br/>
                    <input className="input" type="text" {...register("email", {required: true, pattern: /\S+@\S+\.\S+/})} />
                   <br/>
    
                    {errors.email && errors.email.type === "required" && <span className="error">Email is required</span>}
                    {errors.email && errors.email.type === "pattern" && <span className="error">You should insert email like  /\S+@\S+\.\S+/ pattern</span> }
                    
                    <div>
                   
                    </div>
               <br/>
                <label>Password</label>
                <br/>
                <input className="input"
                    type="password"
                    {...register( "password",({
                    required: true,
                    pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
                    }))}
                />
                <br/>{errors.password && errors.password.type === "required" && <span className="error">You must specify a password</span>}
                {errors.password && errors.password.type === "pattern" && <span className="error">Password must have at least 1 uppercase letter, 1 lowercase letter, 1 special character, 1 number & min 8 characters, max 30 characters.</span> }
                <br/>
                <label>Repeat password</label>
                <br/>
                <input className="input"
                    type="password"
                    {...register ("password_repeat", ({
                    validate: value =>
                        value === password.current || "The passwords do not match"
                    }))} />
                    {errors.password_repeat && <p className="error">{errors.password_repeat.message}</p>}
                    <br/> <br/>
                    <input style={{background: 'brown'}} className="input" type="submit" />
                </form>
            </div> :
            <div className="newUser">
              <form onSubmit={handleSubmit(onSubmit)}>
                              <h1 style={{textAlign: 'center'}}>Log In form</h1>
                <label>Email</label>
                <br/>
                <input className="input" type="text" {...register("email", {required: true})} />
                <br/>
                {errors.email && errors.email.type === "required" && <span className="error">Email is required</span>}
                <br/>
                <label>Password</label>
                <br/>
                <input className="input" type="password" {...register( "password",({required: true}))}/>
                <br/>{errors.password && errors.password.type === "required" && <span className="error">Password is required</span>}
                <br/> 
                <input style={{background: 'brown'}} className="input" type="submit" />
          </form>
      </div>
            } <br/> <br/>
            {
                newUser ? <p style={{textAlign: 'center'}}>Already have an account? <span onClick={() => setNewUser(!newUser)} style={{color: 'blue'}}>Log In</span> </p> :
                <p style={{textAlign: 'center'}}>Don't have an account? <span onClick={() => setNewUser(!newUser)} style={{color: 'blue'}}>Sign Up</span> </p>
            } <br/>
           <br/>
           <div className="button">
                <button onClick={handleGoogleSignIn}>Continue with Google</button> <br/><br/>
                <button onClick={handleFacebookSignIn}>Continue with Facebook</button>
           </div>

      </div>
    );
  }

export default Login;