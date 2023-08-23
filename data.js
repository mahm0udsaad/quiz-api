const {MongoClient} = require('mongodb')
const client = new MongoClient(process.env.DB_URL)
const dotenv = require('dotenv').config()


const connectToDatabase =async () => {
     try{
        await client.connect()
        console.log('Connect to DB succesfully');
     }catch(err){
        console.error(err);
     }
};

module.exports = {
    connectToDatabase,
    client
  };
