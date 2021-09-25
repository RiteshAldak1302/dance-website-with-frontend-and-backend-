const express = require("express");
const path = require("path"); 
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

mongoose.connect('mongodb://localhost:27017/contactDance',{ useNewUrlParser: true});
const port = 2800;

//define mongoose schema
const danceSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address:String,
    concern:String
  });

  //define modle for compilation of schema
  const contactDetail = mongoose.model('contactDetail', danceSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{  
    res.status(200).render('index.pug'); 
})
app.get('/contact', (req, res)=>{ 
    res.status(200).render('contact.pug');
})
//handle the post request to store the data of contact form in the DB
app.post('/contact', (req, res)=>{ 
    var myData = new contactDetail(req.body)
    myData.save().then(()=>{res.send("the data has been saved in the Data Base")}).catch(()=>{res.status(404).send("item does not save in the DB")});
    res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});