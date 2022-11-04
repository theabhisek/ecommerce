const { Client } = require("pg")

//databse create using direct method
const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "Abhi",
    port: 5432
})

client.connect().then(res=>{
console.log("Database connect at the port:5432")})
.catch(err=>{
    console.log(err)
}
)
module.exports= client