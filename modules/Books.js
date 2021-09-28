
const mongoose = require('mongoose')



const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    email: String,
    status:String
});


const bookModel = mongoose.model('book', bookSchema);

module.exports= bookModel;