import React from "react";
import "./Review.css"
import { useState } from "react";

const Review = () =>
{
    const[rating,setRating] = useState("");
    const[text,setText] = useState("");

    
  
    return (

        <div >
           {/*  <div className="movie">
                <div className="movie__intro">
                    <img className="movie__backdrop" src={}/>
                </div>
            </div> */}
            


             <div class="box">
                <form>
                    
                    <div class="input-container">
                        <input type="text" onChange={(event) => {setRating(event.target.value)}} required=""/>
                        <label>Rating </label>		
                    </div>
                    <div class="input-container">
                        <input type="text" onChange={(event) => {setText(event.target.value)}} required=""/>
                        <label>Text</label>		
                    </div>
                
                        <button type="button"  class="btn">Add Review</button>
                </form>	
            </div>   

        </div>
        

    )

}

export default Review