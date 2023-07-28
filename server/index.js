const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");   

app.use(cors());
app.use(express.json());
const db = mysql.createConnection({

    user:'root',
    host:'localhost',
    password:'a61a32u1998',
    database: "aaaa", //kendi db name


});

//Product Detail page add product
app.post('/products/insert', (req,res) => {
 
    const name = req.body.name;
    const releaseDate =  req.body.releaseDate;
    const rating =  req.body.rating;
    
    const imageUrl =  req.body.imageUrl;
    //console.log(name)
    //console.log(req);
    db.query('INSERT INTO product (name,rating,release_date,image_url) VALUES (?,?,?,?)',
        [name,rating,releaseDate,imageUrl] ,
        (err,result) => {

            if(err)
            {
                console.log(err)
            }else
            {
                res.send("Values Inserted");
            }
        }
         )
}) ;
//Products page get all movies

app.get('/products/select', (req,res) => {
 
    
    db.query('SELECT * FROM product ',(err,result) => {

        if(err)
        {
            console.log(err)
        }else
        {
            res.send(result);
        }
    } )

})

//Product delete
app.delete('/products/delete/:Id', (req,res) => {

    console.log(req.params.Id +" deleted")
   // db.query('SET FOREIGN_KEY_CHECKS=0')
    db.query('DELETE FROM product WHERE Id = ?',req.params.Id,(err,result) => {

        if(err)
        {
            console.log(err)
        }else
        {
            res.send(result);
        }
    } )
 //   db.query('SET FOREIGN_KEY_CHECKS=1')
})




//////////////////////////////////////////////////////////////////////////////
//Movie Detail page add review
app.post('/productReview/insert', (req,res) => {
 
    const Text = req.body.Text;
    const ID = req.body.ID;
    const U_ID = req.body.U_ID;
    //user ıd cekilip alıncak
    console.log("Text in index.js: " + Text +" ID: " + ID + " U_ID: " + U_ID)
    db.query('INSERT INTO review (ID,U_ID,Text) VALUES (?,?,?)',
        [ID,U_ID,Text] ,
        (err,result) => {

            if(err)
            {
                 console.log(err)
                //console.log(text + ID + U_ID)
            }else
            {
                res.send("Values Inserted");
            }
        }
         )
}) ;

//Movie detail page 

 app.get('/productReview/select/:ID', (req,res) => {
   
    const ID = req.params.ID;
    //console.log("ID with select: " + ID)
    db.query('SELECT * FROM review WHERE ID = ?',[ID],(err,result) => {

        if(err)
        {
            console.log(err)
        }else
        {
            //console.log("result " + result)
            res.send(result);
        }
    } )
 
}) 
//movie detail update
app.put('/productReview/update', (req,res) => {
   
   const Text = req.body.Text;
   const R_ID = req.body.R_ID;
   console.log("text: " + Text)
   const sqlUpdate = "UPDATE review SET Text = ? WHERE R_ID=?";
   db.query(sqlUpdate,[Text,R_ID], (err,result) =>{
    if(err) console.log(err);
    else console.log(result);
   } );
 
}) 
//movie detail delete
app.delete('/productReview/delete/:R_ID', (req,res) => {
   
    
   const R_ID = req.params.R_ID;
   
   const sqlUpdate = "DELETE FROM review WHERE R_ID = ?";
   db.query(sqlUpdate,R_ID, (err,result) =>{
    if(err) console.log(err);
    else console.log(result);
   } );

 }) 

app.get('/personmovie/select/:ID', (req,res) => {
 
    const ID = req.params.ID;
    //console.log("ID with select: " + ID)
    db.query('Select * from personmovie as i, person as p WHERE i.ID = ? and i.P_ID = p.P_ID ',[ID],(err,result) => {

        if(err)
        {
            console.log(err)
        }else
        {
            //console.log("result " + result)
            res.send(result);
        }
    } )

})

 

//////////////////////////////////////////////////////////////////////////////
//Person page add person
 app.post('/persons/insert', (req,res) => {
 
    const Fname = req.body.Pname;
    const Lname = req.body.Lname;
    const Sex = req.body.Sex;
    const Bdate = req.body.Bdate;
   
    //console.log(imageUrl)
    //console.log(req);
    db.query('INSERT INTO person (Fname,Lname,Sex,Bdate) VALUES (?,?,?,?)',
        [Fname,Lname,Sex,Bdate] ,
        (err,result) => {

            if(err)
            {
                console.log(err)
            }else
            {
                res.send("Values Inserted");
            }
        }
         )
}) ; 

//Person page get all actors
app.get('/persons/select', (req,res) => {
 
    
    db.query('SELECT * FROM person ',(err,result) => {

        if(err)
        {
            console.log(err)
        }else
        {
            res.send(result);
        }
    } )

})
//person update
app.put('/persons/update', (req,res) => {
   
   const Pname = req.body.Pname;
   const Lname = req.body.Lname;
   const P_ID = req.body.P_ID;
   console.log("Pname: " + Pname+ " Lname: " + Lname + " P_ID: " +P_ID)
   const sqlUpdate = "UPDATE person SET Pname = ?,Lname = ? WHERE P_ID=?";
   db.query(sqlUpdate,[Pname,Lname,P_ID], (err,result) =>{
    if(err) console.log(err);
    else console.log(result);
   } );
 
}) 
//person delete
app.delete('/persons/delete/:P_ID', (req,res) => {
   
    
   const P_ID = req.params.P_ID;
   
   const sqlUpdate = "DELETE FROM person WHERE P_ID = ?";
   db.query(sqlUpdate,P_ID, (err,result) =>{
    if(err) console.log(err);
    else console.log(result);
   } );

 }) 
//login
 app.get('/loginn/:password/:username', (req,res) => {

    db.query('SELECT * FROM user WHERE username = ? and password = ? ',
        [req.params.username, req.params.password],
        (err,result) => {

        if(err)
        {
            console.log(err)
        }else
        {
            res.send(result);
        }
    } )

})
//register --add user
app.post('/register', (req,res) => {

    const userName = req.body.userName;
    const Email =  req.body.Email;
    const Password =  req.body.Password;
    //console.log(name)
    db.query('INSERT INTO user (username,email,password) VALUES (?,?,?)',
        [userName,Email,Password] ,
        (err,result) => {

            if(err)
            {
                console.log(err)
            }else
            {
                res.send("Values Inserted");
            }
        }
    )
}) ;

app.listen(3001,()=>{

    console.log("Connection succeed")
});