import React from "react";
import "./user.css"
import { useState } from "react";

const User = () =>
{
    const[name,setName] = useState("");
    const[password,setPassword] = useState("");

    const[userName,setUserName] = useState("");
    
    const[email,setEmail] = useState("");
    
   
  
    return (
        <div class="box">
            <form>
                
                <div class="input-container">
                    <input type="text" onChange={(event) => {setName(event.target.value)}} required=""/>
                    <label>Name</label>		
                </div>
                <div class="input-container">
                    <input type="text" onChange={(event) => {setPassword(event.target.value)}} required=""/>
                    <label>Username</label>		
                </div>
                <div class="input-container">
                    <input type="text" onChange={(event) => {setUserName(event.target.value)}} required=""/>
                    <label>Password</label>		
                </div>
                <div class="input-container">		
                    <input type="mail" onChange={(event) => {setEmail(event.target.value)}} required=""/>
                    <label>Email</label>
                </div>
                    <button type="button"  class="btn">Add User</button>
            </form>	
        </div>

    )

}

export default User