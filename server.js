'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose')

const server = express();
server.use(cors());
const PORT = process.env.PORT;


mongoose.connect('mongodb://localhost:27017/Best-Books');

const bookSchema = new mongoose.Schema({
    bookName: String,
    ownername: String,
    email: String
});

const bookModel = mongoose.model('book', bookSchema);

function seedBookInfo(){
    const java = new bookModel({
        bookName: 'java', 
        ownername: 'bashar',
        email: 'owainatbashar13@gmail.com'
    })
    const js = new bookModel({
        bookName: 'js', 
        ownername: 'bash',
        email: 'owainatbashar13@gmail.com'
    })

    java.save();
    js.save();

}
//   seedBookInfo();

server.get('/', homeHandler);
server.get('/getBooksHandler', getBooksHandler);


function homeHandler(req, res) {
    res.send("it's working")
}

//localhost:3001/getBooksHandler?ownerName=bashar
function getBooksHandler(req, res){

    let name = req.query.ownerName;
    console.log(name);
    
    bookModel.find({ownername:name}, function(error,ownerData) {
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