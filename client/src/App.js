
import './App.css';
import {BrowserRouter as Router ,Routes, Route} from "react-router-dom"
import Header from './components/Header/Header'
import Home from "./pages/home/home"
import Product from "./pages/Product/product"
import { useState } from 'react';
import Axios from 'axios';
import React from 'react';
import Person from "./pages/Persons/Person"
import User from "./pages/Users/user"
import Review from "./pages/Reviews/Review"
import MoviePage from "./pages/MoviePage/MoviePage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
///TODO
//<Route path="movie/create" element={<h1>Movie add page</h1>}> </Route>
//<Route path="movie/read" element={<h1>Movie search page</h1>}> </Route>
//<Route path="movie/update" element={<h1>Movie update page</h1>}> </Route>
//<Route path="movie/delete" element={<h1>Movie delete page</h1>}> </Route>

function App() {
  const[islogged,setislogged]=useState(false)
  const[username,setusername] = useState("");
  const[password,setpassword] = useState("");
  const getAcces =() =>{

      Axios.get(`http://localhost:3001/loginn/${password}/${username}`).then((response) => {
      console.log(response)   
      if(response.data.length===1 && username===response.data[0].username){
              setislogged(true)
              global.userinfo=response.data[0];
              console.log(global.userinfo)
          }

      });
  };
  const[reguserName,setreguserName] = useState("");
  const[Email,setEmail] = useState("");
  const[regPassword,setregPassword] = useState("");
  const addUser = () =>
  {
      Axios.post('http://localhost:3001/register',{userName:reguserName,Email:Email,Password:regPassword});
  }
  if(islogged) {
      return (
          <div className="App">
              <Router>

                  <Header/>

                  <Routes>
                      <Route index element={<Home/>}> </Route>
                      <Route path="products" element={<Product/>}> </Route>
                      <Route path="persons" element={<Person/>}> </Route>
                      <Route path="users" element={<User/>}> </Route>
                      <Route path="reviews" element={<Review/>}> </Route>
                      <Route path="products/:id" element={<MoviePage/>}></Route>
                      <Route path="/*" element={<h1>Error page</h1>}> </Route>
                  </Routes>


              </Router>
          </div>
      )
  }else{
      return (
              <div>
                  <div className="box">

                  <div className="input-container">
                      <input type="text" onChange={(event) => {
                          setusername(event.target.value)
                      }} required=""/>
                      <label>UserName</label>
                  </div>
                  <div className="input-container">
                      <input type="text" onChange={(event) => {
                          setpassword(event.target.value)
                      }} required=""/>
                      <label>Password </label>
                  </div>
                  <button type="button" onClick={getAcces} className="btn">Login</button>
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                  <div className="input-container">
                      <input type="text" onChange={(event) => {
                          setreguserName(event.target.value)
                      }} required=""/>
                      <label>UserName</label>
                  </div>
                  <div className="input-container">
                      <input type="text" onChange={(event) => {
                          setEmail(event.target.value)
                      }} required=""/>
                      <label>EMail </label>
                  </div>
                  <div className="input-container">
                      <input type="text" onChange={(event) => {
                          setregPassword(event.target.value)
                      }} required=""/>
                      <label>Password </label>
                  </div>

                  <button type="button" onClick={addUser} className="btn">Register</button>
                  </div>
              </div>
      )
  }
}

export default App;
