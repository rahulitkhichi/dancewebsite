const express = require("express");
const path = require("path");
const app = express();
const port = 8000;

var mongoose = require('mongoose');
// var bodyParser = require('body-Parser');
// const bodyParser = require("body-parser");
mongoose.connect('mongodb://localhost/contact', { useNewUrlParser: true,useUnifiedTopology: true});


// define mongo schema

// var contactschema = new mongoose.schema({
//     name: "string", "phone": "email", "address"
// });

var schema = new mongoose.Schema({ name: 'string', phone: 'string', email: 'string', address: 'string' });
var contact = mongoose.model('contact', schema);

// var contact = mongoose.model('contact', contactschema);

// var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
// app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));
// app.use(bodyParser.json({limit: '50mb'}));


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get("/", (req, res) => {
    const params = {}
    // res.status(200).render('home.pug', params);
})

app.get("/contact", (req, res) => {
    const params = {}
    // res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("this item is saved to the database")
    }).catch(()=>{
        res.send("the message not saved to database")
    });

    // res.status(200).render('contact.pug');

    // START THE SERVER
    app.listen(port, () => {
        console.log(`The application started successfully on port ${port}`);
    });
})