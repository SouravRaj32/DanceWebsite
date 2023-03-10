const express = require("express");
const path = require("path"); 
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/contactDance', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Define mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(bodyParser.urlencoded({ extended: true }));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res)=>{ 
    const params = { }
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res)=>{
    const myData = new Contact(req.body);
    myData.save()
    .then(()=>{
        res.send("This item has been saved to the database");
    })
    .catch((err)=>{
        res.status(400).send("item was not saved to the database");
    });
    // res.status(200).render('contact.pug', );
});

// START THE SERVER
app.listen(8000, ()=>{
    console.log(`The application started successfully on port 8000`);
});