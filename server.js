'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose')

const server = express();
server.use(cors());
const PORT = process.env.PORT;
const bookModel = require('./modules/Books')

mongoose.connect('mongodb://localhost:27017/Best-Books');


function seedBookInfo(){
    const java = new bookModel({
        title: 'java', 
        description:'A book to learn java for beginners',
        email: 'owainatbashar13@gmail.com', 
        status: 'available'
    })
    const js = new bookModel({
        title: 'js', 
        description: 'A book to learn javascript for begginers',
        email: 'hermen_the_mongoose@gmail.com',
        status:'not available'
    })

    java.save();
    js.save();

}
 //  seedBookInfo();

server.get('/', homeHandler);
server.get('/getEmail', getEmail);


function homeHandler(req, res) {
    res.send("it's working")
}

//localhost:3001/getEmail?email=owainatbashar13@gmail.com
function getEmail(req, res){

    let email = req.query.email;
    console.log(email);
    
    bookModel.find({email:email}, function(error,ownerData) {
        if(error){
            console.log('error in getting data', error)
        }
        else{
            res.send(ownerData)
        }
    })

}


server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})