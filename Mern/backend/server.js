const app = require('./app');
const dotenv = require('dotenv');
const { consumers } = require('stream');
const connectDatabase = require('./config/database');
const { Server } = require('http');

//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uncaught Exception`);
    process.exit(1)
})

//config

dotenv.config({path:"backend/config/config.env"})

//connection to database
connectDatabase()



const server= app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})

// console.log(youtube);
//unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`);

    server.close(()=>{
         process.exit()
    })
})