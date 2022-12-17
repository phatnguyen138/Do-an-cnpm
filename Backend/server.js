const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./app/routes/auth');
const teacherRoute = require('./app/routes/teacher');
const Class = require('./app/models/ClassInfo');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Set up env file for private data
dotenv.config()

//Set up class name
const checkList = Class.find({});
if(checkList.size() <= 1){
  const nameList = ['10A1','10A2','10A3','10A4','11A1','11A2','11A3','11A4','12A1','12A2','12A3','12A4'];
  nameList.forEach(async(element) => {
    let newClass = new Class({
      className: element,
    })
    const class1 = await newClass.save();
  });
}


//Set up route
app.use('/auth', authRoute);
app.use('/teacher', teacherRoute);


//Connect to database (Phat's database)
// Collect with mongo atlas by MONGODB_URL in .env file
mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log('Connected to database')
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});