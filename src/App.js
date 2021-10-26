import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home'
import Destination from './components/Destination/Destination'
import Blog from './components/Blog/Blog'
import Contact from './components/Contact/Contact'
import Login from './components/Login/Login'
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { createContext, useState } from 'react';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Header></Header>
            <Switch>
               <div className="main-div">
               <Route path="/home">
                    <Home></Home>
                </Route>
                <PrivateRoute path="/destination/:title">
                    <Destination></Destination>                      
                </PrivateRoute>
                <Route path="/blog">
                    <Blog></Blog>
                </Route>
                <Route path="/contact">
                    <Contact></Contact>
                </Route>
                <Route path="/login">
                    <Login></Login>
                </Route>
                <Route exact path="/">
                    <Home></Home>
                </Route>
               </div>
            </Switch>
        </Router>
    </UserContext.Provider>
  );
}

export default App;
