const express = require("express");
const database = require("./configuration/databaseConfiguration");
const documentRouter = require("./routes/documentRoute");
const userRouter = require("./routes/userRoute");
const establishRelations = require("./utils/relations");
const dotenv = require("dotenv");
dotenv.config({path : "./configuration/config.env"});

const app = express();
establishRelations();
//Middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//Routes
app.use("/api/v1/user",userRouter);
app.use("/api/v1/document",documentRouter);

database
    .sync()
    .then(()=>{
        console.log("Connected To Database");
    })
    .catch((err)=>{
        console.log(err);
        console.log("Connection To Database Failed");
    });

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>console.log(`Server started at port ${PORT}`));

