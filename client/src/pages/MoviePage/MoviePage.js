import React , { useEffect } from "react";
import "./MoviePage.css"
import { useState } from "react";
//import {getProductId} from "../Product/product"
import Axios from 'axios'

const MoviePage = () =>{
    //console.log(window.location.pathname)
    var url = window.location.pathname
    var Movie_ID = url.split("/")[2]
    
    //console.log("MMMM ID " + Movie_ID) 

    const[U_ID,setU_Id] = useState(null);
    const[ID,setID] = useState(null);
    const[P_Id,setP_Id] = useState(null);
    const[Text,setText] = useState("");
   

    const[reviewList,setReviewList] = useState([]);
    const[newReview, setNewReview ] = useState("");

    const[personListInMovie,setPersonListInMovie] = useState([]);
    /// 
   
    const AddReview = () =>
    {
        console.log(global.userinfo.U_ID)
        Axios.post("http://localhost:3001/productReview/insert",{
            Text:Text,
            ID:Movie_ID,
            U_ID:global.userinfo.U_ID
        }).then(() => {
           
            setReviewList([
                ...reviewList,
                {
                    Text:Text,
                    Movie_ID:ID,
                    UserID:global.userinfo.U_ID
                },
            ]);
           
         });
        // console.log("Insert: " + Text +" " + ID )
   
    };

    const getReviews2 = () =>
    {   

        Axios.get(`http://localhost:3001/productReview/select/${Movie_ID}`).then((response) => { 
                    setReviewList(response.data)
        });
    } 
    const updateReview= (R_ID) =>
    {
        Axios.put("http://localhost:3001/productReview/update",{
            Text:newReview,R_ID:R_ID
        }).then(() =>{
            getReviews2();
        });
        

    }
    const deleteReview= (R_ID) =>
    {
       
        Axios.delete(`http://localhost:3001/productReview/delete/${R_ID}`,{
            
        });
      
        

    }
    const getAllPersonsInThisMovie =() =>
    {

        Axios.get(`http://localhost:3001/personmovie/select/${Movie_ID}`).then((response) => {
            console.log("AAA:" + response);
            setPersonListInMovie(response.data);
            
            
        });
        console.log(personListInMovie)
    }   
  
    useEffect(() => {
        setID(Movie_ID);
        getReviews2();
        getAllPersonsInThisMovie();
     }, []) 
     
    return(
            <div>
                <form>
                    <div className="input-container">
                        <input type="text" 
                            onChange={(event) => {setText(event.target.value)}}
                         required=""/>
                        <label>Text</label>
                    </div>

                    <button type="button" onClick={AddReview} className="btn">Add Review</button>
                </form>
                {
                  personListInMovie.map( (val2) =>
                  {
                  
                        return(
                            <div class = "movie-card">
                                <div class="movie-content">
                                    
                                    <div class="movie-content-header">
                                            
                                            <h3 class="movie-title">Aktor Bilgisi:  {val2.FName}  {val2.Lname}  </h3>
                                            <div class="movie-info">
                                            
                                            <div class="info-section">
                                                <label>Bilgiler</label>
                                                <span>{val2.Sex} {val2.BDate}</span>
                                            </div>
 
                                        </div>
                                        
                                    </div>
                                </div>  
                            </div> 
                        )
                      /*return (
                          <div> Aktor Bilgisi:  {val2.Fname}  {val2.Lname} {val2.Sex} {val2.BDate} </div>  
                          <div  class="movie-card" >
                              
                              <div >
                              

                                  <div class="movie-content">
                                      <div class="movie-content-header">
                                          
                                          <h3 class="movie-title">User Id : {val.U_ID} </h3>
                                      
                                      </div>
                                      <div class="movie-info">
                                          
                                          <div class="info-section">
                                              <label>Yorum</label>
                                              <span>{val.Text}</span>
                                          </div>
                                          
                                      </div>
                                  </div>
                              
                                  
                                  <button class="btn" onClick={()=> deleteReview(val.R_ID)}>Delete</button>
                                  
                              </div>
                              <input type="text" id="updateInput" onChange={(event) => {setNewReview(event.target.value)}} required=""/>
                              <button class="btn" onClick={()=> updateReview(val.R_ID)}>Update</button>
                          </div>
                          
                          );*/
              
                        
                    }
                    ) 
                
                
                }
               
                
                <div class="container" >
               
                {          
                reviewList.map( (val) =>
                    {
  
                        return (         
                            <div  class="movie-card" >
                                <div >
                                    <div class="movie-content">
                                        <div class="movie-content-header">
                                            
                                            <h3 class="movie-title">User Id : {val.U_ID} </h3>
                                        
                                        </div>
                                        <div class="movie-info">
                                            
                                            <div class="info-section">
                                                <label>Yorum</label>
                                                <span>{val.Text}</span>
                                            </div>
 
                                        </div>
                                    </div>
                                
                                    {(global.userinfo.U_ID==1 || global.userinfo.U_ID==2 || global.userinfo.U_ID==val.U_ID) &&
                                        <button class="btn" onClick={()=> deleteReview(val.R_ID)}>Delete</button>}
                                    
                                </div>
                                {(global.userinfo.U_ID==1 || global.userinfo.U_ID==2 || global.userinfo.U_ID==val.U_ID) &&
                                    <input type="text" id="updateInput" onChange={(event) => {setNewReview(event.target.value)}} required=""/>}
                                {(global.userinfo.U_ID==1 || global.userinfo.U_ID==2 || global.userinfo.U_ID==val.U_ID) &&
                                    <button class="btn" onClick={()=> updateReview(val.R_ID)}>Update</button>}
                            </div>
                            
                            );
     
                    })

                }

               
                </div>
            </div>

    )
}
export default MoviePage


