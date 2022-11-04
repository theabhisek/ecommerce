const { Client } = require("pg")
const dotenv = require("dotenv")
dotenv.config()
 
//***********************Database using env file ****************************
const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})

client.connect().then(res=>{
console.log("Database connect at the port:5432"+res)})
.catch(err=>{
    console.log(err)
}
)

module.exports= client