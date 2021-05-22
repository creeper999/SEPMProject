// problem in getting the number from localhost

const express = require("express");
const fs = require("fs");
var mongoose = require("mongoose");
const bodyparse = require('body-parser');
const path = require("path");

const app = express();
const port = 8000;

mongoose.connect('mongodb://localhost/customerContact', {useNewUrlParser: true});

// define mongoose schema
var contactSchema = new mongoose.Schema({
    movie: String,
    nam: String,
    watchers: String,
    time: String,
    contac: String
});

var Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); //for serving static file
app.use(express.urlencoded());


// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // set the views directory


// ENDPOINTS
app.get('/', (req, res) =>{
    const con = "This is content";
    const params = {"title": 'Watch Movies', "content": con};
    res.status(200).render('index.pug', params);
});

app.post('/', (req, res) => {

    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("We have your contact information, Thank You");
    }).catch(() =>{
        res.status(400).send("Item not saved to the databse");
    });

    // const params = {"message": 'Your form has been submitted successfully'};
    // res.status(200).render('index.pug', params);
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
