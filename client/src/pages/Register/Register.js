import React from "react";
import "./Register.css"
import { useState } from "react";

const Register = () =>
{
    const[rating,setRating] = useState("");
    const[text,setText] = useState("");



    return (

        <div class="box">
            <form>
                <div className="input-container">
                    <input type="text" onChange={(event) => {
                        setText(event.target.value)
                    }} required=""/>
                    <label>UserName</label>
                </div>
                <div className="input-container">
                    <input type="text" onChange={(event) => {
                        setRating(event.target.value)
                    }} required=""/>
                    <label>EMail </label>
                </div>
                <div className="input-container">
                    <input type="text" onChange={(event) => {
                        setRating(event.target.value)
                    }} required=""/>
                    <label>Password </label>
                </div>

                <button type="button" className="btn">Add Review</button>

            </form>


        </div>

    )

}

export default Register