const express = require('express');

const {PORT} = require('./config/index')
const dbConnect = require('./database/index')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();

// for locally use 
// const corsOption = {
//     credentials: true,
//     origin: ['http://localhost:5173']
// }

app.use(cookieParser());
app.use(express.json({limit:'50mb'}));    //our application accept the json formate data
// app.use(cors(corsOption));
// accept all url by this cors middleware 
app.use(cors({
    origin: function (origin,callback){
        return callback(null,true)
    },
    optionsSuccessStatus: 200,
    credentials: true
}));
app.use(router)
dbConnect()
// app.get('/',(req,res) => res.json({msg: "Hello World! This is new yes"}))

// this is middleware => its allow storage folder in statically means its show publicaly 
app.use('/storage',express.static('storage'))

app.use(errorHandler)
app.listen(PORT,console.log(`Backend is running on port: ${PORT}`));