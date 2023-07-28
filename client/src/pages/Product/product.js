import React, { useEffect } from "react";
import "./product.css"
import { useState } from "react";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";


const Product = () =>
{
    const[name,setName] = useState("");

    const[releaseDate,setReleaseDate] = useState("");
    
    const[rating,setRating] = useState(0);
    
   
    
    const[imageUrl,setImageUrl] = useState("");

    const[productList,setProductList] = useState([]);
    const navigate = useNavigate();
    const goToMoviePage = ( key ) =>
    {
        /* jsarray = ["cat", "dog", "tiger", "wolf"];
        sessionStorage.setItem("jsArray", JSON.stringify(jsarray));
 */     
        navigate(`./${key}`);
    }
    //TODO butona tikladiktan sonra eklemeli!
    const addProduct = () =>
    {

        Axios.post('http://localhost:3001/products/insert',{name:name,releaseDate:releaseDate,rating:rating,imageUrl:imageUrl})
        .then(()=>{
            //hemen eklemiyor 
            setProductList(
                [...productList,
                {
                    name:name,
                    releaseDate:releaseDate,
                    rating:rating,
                    imageUrl:imageUrl,
                },
            ]);
        });
        //console.log(name, releaseDate,rating,imageUrl)
    }
   
    // Axios.get('http://localhost:3001/products/allproducts') kabul etmiyor!

    /// NOTE val. Dbdeki column nameler olmalı yani {val.Name} gibi
    const getProducts =() =>{

        Axios.get('http://localhost:3001/products/select').then((response) => {
            setProductList(response.data);
            //console.log(response.data);
            
        });
    };

    useEffect(() => {
       getProducts();
    }, [])
    
     const deleteProduct = (id) =>{
       
        console.log("Delete " + id)
        
        Axios.delete(`http://localhost:3001/products/delete/${id}`).then((response) => {
            setProductList(
                productList.filter((val) =>{
                    return val.id != id;
                })
            );
        });
       // console.log(id);
    };  
    
    return (
       
        
        <div >        
            { (global.userinfo.U_ID==1 || global.userinfo.U_ID==2) &&
                    <form>
                    <div class="deneme">
                        <div class="input-container2">
                            <input type="text" onChange={(event) => {setName(event.target.value)}} required=""/>
                            <label>Name</label>		
                        </div>
                        <div class="input-container2">
                            <input type="text" onChange={(event) => {setReleaseDate(event.target.value)}} required=""/>
                            <label>Release Date</label>		
                        </div>
                        <div class="input-container2">
                            <input type="text" onChange={(event) => {setRating(event.target.value)}} required=""/>
                            <label>Rating</label>		
                        </div>
                        <div class="input-container2">		
                            <input type="text" onChange={(event) => {setImageUrl(event.target.value)}} required=""/>
                            <label>Image URL </label>
                        </div>
                        <button type="button" onClick={addProduct} class="btn">Add Product</button>
                    </div>   
                
                    </form>
            }
            
           
        
        <div class="container" >
            
            {productList.map((val) =>{
                return (
                    <div  class="movie-card" >
                        
                        <div >
                            <div class="movie-header manOfSteel" onClick = {()=> goToMoviePage(val.ID)}>
                                <div class="header-icon-container">
                                
                                    <img src={val.image_url} class="material-icons header-icon"/>
                                    
                                </div>
                            </div>
                            <div class="movie-content">
                                <div class="movie-content-header">
                                    
                                    <h3 class="movie-title">{val.Name}</h3>
                                    
                                </div>
                                <div class="movie-info">
                                    <div class="info-section">
                                        <label>Release Date</label>
                                        <span>{val.Release_date}</span>
                                    </div>
                                    <div class="info-section">
                                        <label>Rating</label>
                                        <span>{val.Rating}</span>
                                    </div>
                            
                                </div>
                            </div>
                           
                            {(global.userinfo.U_ID==1 || global.userinfo.U_ID==2) &&
                                <button class="btn" onClick={() => {deleteProduct(val.ID)} }>Delete</button>}
                            {(global.userinfo.U_ID==1 || global.userinfo.U_ID==2) &&
                                <button class="btn">Update</button>}
                        </div>
                     </div>
                    
                    );
        
                })
            }
            
        </div>
        </div>
    )

}

export default Product