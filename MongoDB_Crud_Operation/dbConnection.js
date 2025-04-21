const { MongoClient } = require("mongodb")

//MongoDB url
conn = "mongodb://127.0.0.1:27017"

//create client
const client = new MongoClient(conn);

//async function to connect and return DB instance
const dbConnection =async()=>{

    try{
        await client.connect();
        console.log("MongoDB Connected Successfully");

        let db = client.db("crud_db");  //crud_db = database name
        return db

    }catch(err){
        console.log("Error"+err)
        throw err
    }

}
 module.exports = {dbConnection}

