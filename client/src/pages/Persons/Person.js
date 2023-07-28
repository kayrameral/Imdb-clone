import React , { useEffect } from "react";
import "./Person.css"
import { useState } from "react";

import Axios from 'axios'
const Person = () =>
{
    const[Pname,setPName] = useState("");
    const[Lname,setLName] = useState("");

    const[Sex,setSex] = useState("");
    
    const[Bdate,setBDate] = useState(0);
    const[personList,setPersonList] = useState([]);

    const[newPerson, setNewPerson ] = useState("");

    const addPerson = () =>
    {

        Axios.post('http://localhost:3001/persons/insert',{Pname:Pname,Lname:Lname,Sex:Sex,Bdate:Bdate})
        .then(()=>{
            //hemen eklemiyor 
            setPersonList(
                [...personList,
                {
                    Pname:Pname,
                    Lname:Lname,
                    Sex:Sex,
                    Bdate:Bdate,
                },
            ]);
        });
    }
    
    const getPersons =() =>{

        Axios.get('http://localhost:3001/persons/select').then((response) => {
            setPersonList(response.data);
            //console.log(response.data);
            
        });
    };
    useEffect(() => {
        getPersons();
     }, [])

     const updatePerson= (P_ID) =>
    {
        const fullname = newPerson.split(" ")
        const Pname = fullname[0]
        const Lname = fullname[1]
        console.log("asda " + P_ID)
        Axios.put("http://localhost:3001/persons/update",{
            Pname:Pname,Lname:Lname,P_ID:P_ID
        });
        console.log("Pname " + Pname)
        console.log("Lname:"  + Lname)
        

    }
    const deletePerson= (P_ID) =>
    {
       
        Axios.delete(`http://localhost:3001/persons/delete/${P_ID}`,{
            
        });
      
        

    }
/*
    useEffect(() => {
       getProducts();
    }, [])

    const deletePerson = (id) =>{
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
            setProductList(
                productList.filter((val) =>{
                    return val.id != id;
                })
            );
        });
        console.log(id);
    };
    */
  
    return (

        <div>
        
                    { (global.userinfo.U_ID==1 || global.userinfo.U_ID==2) &&           
                    
                    <form>
                        
                        <div class="input-container">
                            <input type="text" onChange={(event) => {setPName(event.target.value)}} required=""/>
                            <label>First Name </label>		
                        </div>
                        <div class="input-container">
                            <input type="text" onChange={(event) => {setLName(event.target.value)}} required=""/>
                            <label>Last Name</label>		
                        </div>
                        <div class="input-container">
                            <input type="text" onChange={(event) => {setSex(event.target.value)}} required=""/>
                            <label>Sex</label>		
                        </div>
                        <div class="input-container">		
                            <input type="text" onChange={(event) => {setBDate(event.target.value)}} required=""/>
                            <label>Birth Date</label>
                        </div>
                            <button type="button" onClick={addPerson}  class="btn">Add Person</button>
                    </form>	
                    }


    

    <div class="container" >
            
            {personList.map((val,key) =>{ console.log(val)
                return (
                    <div key={key} class="movie-card" >
                        
                        <div >
                           

                            <div class="movie-content">
                                <div class="movie-content-header">
                                    
                                    <h3 class="movie-title">{val.FName} {val.Lname} </h3>
                                   
                                </div>
                                <div class="movie-info">
                                    <div class="info-section">
                                        <label>Sex</label>
                                        <span>{val.Sex}</span>
                                    </div>
                                    <div class="info-section">
                                        <label>Birth Date</label>
                                        <span>{val.Bdate}</span>
                                    </div>
                            
                                </div>
                                {(global.userinfo.U_ID==1 || global.userinfo.U_ID==2) &&
                                    <button class="btn" onClick={()=> deletePerson(val.P_ID)} >Delete</button>}
                            </div>

                            {(global.userinfo.U_ID==1 || global.userinfo.U_ID==2) &&
                                <button class="btn"  onClick={()=> updatePerson(val.P_ID)}>Update</button>}
                           { (global.userinfo.U_ID==1 || global.userinfo.U_ID==2) &&
                           <input type="text" id="updateInput" onChange={(event) => {setNewPerson(event.target.value)}} required=""/>}
                           
                        </div>
                     </div>
                    
                    );
        
                })
            }
            
        </div>
      
   
        </div>
    
    )

}

export default Person