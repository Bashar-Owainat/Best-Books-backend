'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose')

const server = express();
server.use(cors());
const PORT = process.env.PORT;
server.use(express.json());
const bookModel = require('./modules/Books')

mongoose.connect('mongodb://localhost:27017/Best-Books');


function seedBookInfo() {
    const java = new bookModel({
        title: 'java',
        description: 'A book to learn java for beginners',
        email: 'owainatbashar13@gmail.com',
        status: 'available'
    })
    const js = new bookModel({
        title: 'js',
        description: 'A book to learn javascript for begginers',
        email: 'hermen_the_mongoose@gmail.com',
        status: 'not available'
    })

    java.save();
    js.save();

}
//  seedBookInfo();

server.get('/', homeHandler);
server.get('/getEmail', getEmail);
server.post('/addBook', addBookHandler)
server.delete('/deleteBook', deleteBookHandler);
server.put('/updateCat', updateCatHandler);


function homeHandler(req, res) {
    res.send("it's working")
}


//localhost:3001/getEmail?email=owainatbashar13@gmail.com
function getEmail(req, res) {

    let email = req.query.email;
    console.log(email);

    bookModel.find({ email: email }, function (error, ownerData) {
        if (error) {
            console.log('error in getting data', error)
        }
        else {
            res.send(ownerData)
        }
    })

}
//localhost:3001/addBook?title1=programming&description1=introToJava&email1=chance@gmail.com&status1=available

//addBook
async function addBookHandler(req, res) {
    console.log('data test')
    let { title1, description1, email1, status1 } = req.body;
    console.log(req.body);
    bookModel.create({
        title: title1,
        description: description1,
        email: email1,
        status: status1
    }).then(() => {
        console.log("testtt");
        bookModel.find({ email: email1 }, function (error, bookData) {
            if (error) {
                console.log('error in getting data', error)
            }
            else {
                res.send(bookData)
            }
        })
    })


}

function deleteBookHandler(req,res ) {
    console.log(req.query)
    let bookID = req.query.bookID;
    let ownerEmail = req.query.ownerEmail;

    bookModel.deleteOne({ _id: bookID }).then(() => {
        bookModel.find({ email: ownerEmail }, function (error, bookData) {
            if (error) {
                console.log('error in getting data', error)

            }
            else {
                res.send(bookData)
            }
        })
    })

}


function updateCatHandler(req, res){

    console.log('UPDATE', req.body)

    let {title, description, email, status } = req.body;
    bookModel.findByIdAndUpdate(bookID, {title, description, status} , (error, updatedData) =>{
        if(error){
            console.log('error in updating', error)
        }
        else{
            console.log('updatedData',updatedData);
            bookModel.find({email: email}, function (error, bookData){
                if(error){
                    console.log('error in getting data', error)
                }
                else{
                    res.send(bookData)
                }
            })
        }
    })
}


server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})