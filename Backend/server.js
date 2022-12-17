const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./app/routes/auth');
const teacherRoute = require('./app/routes/teacher');
const Class = require('./app/models/ClassInfo');
const Subject = require('./app/models/Subject');
const { subjectSummary } = require("./app/controllers/teacherController");
const { collection } = require("./app/models/Student");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Set up env file for private data
dotenv.config()


//Set up class name
classCount = async() => {
  const count =  await Class.countDocuments({}).exec();
  if(count <= 1){
    const nameList = ['10A1','10A2','10A3','10A4','11A1','11A2','11A3','11A4','12A1','12A2','12A3','12A4'];
    nameList.forEach(async(element) => {
      let newClass = new Class({
        className: element,
      })
      const class1 = await newClass.save();
    });
  };
}
classCount();


//Set up class name
subjectCount = async() => {
  const count =  await Subject.countDocuments({}).exec();
  if(count <= 1){
    const nameList = ['Math','Literature','English'];
    nameList.forEach(async(element) => {
      let newClass = new Subject({
        name: element,
      })
      await newClass.save();
    });
  };
}
subjectCount();

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