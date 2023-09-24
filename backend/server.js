const express = require('express')
const colors = require('colors')
const dotenv =require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/dbconfig')
const app = express();


app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})


//configure env file
dotenv.config();
app.use(morgan('dev'));
app.use(express.json());


// port
const PORT = process.env.PORT || 8000;

//rest get api
app.get('/', (req, res) => {
    res.send("Hello world");
})

app.use('/api',require("./routes/CreateUser"))
app.use('/api', require("./routes/DisplayData"))
app.use('/api', require("./routes/OrderData"))


// run listen
app.listen(PORT, () => {
    console.log(colors.red(`Server is in  ${process.env.DEV} mode running on ${PORT}`.bgCyan.white))
})


