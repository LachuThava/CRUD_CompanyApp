const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
var cors = require('cors')


mongoose.set('strictQuery', true);
const app = express();

app.use(express.json());
app.use(cors());

//connect to the database
mongoose.connect("mongodb://localhost:27017",
{
    dbName:"Company_DB",
    useNewUrlParser:true,
    useUnifiedTopology:true
},(error)=>{
    error ? console.log("error :: ",error):console.log("Database Connected....");
})

const employeeRouter = require('./routes/employees');
app.use('/employees',employeeRouter);

app.listen(8080,()=>{console.log("server is started....")})
