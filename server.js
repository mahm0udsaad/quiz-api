const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const {client , connectToDatabase} = require('./data')
const app = express()
const PORT = process.env.PORT || 3000 ;

app.use(cors())
app.use(express.json())
const getTest = async(testName) => {
    await connectToDatabase()
    try {
       const database = client.db('tests'); 
       const collection = database.collection(testName);
       return collection;
     } catch (error) {
       console.error('Error getting collection:', error);
       return null;
     }
};
app.get('/',(req,res)=>{
    res.send('Hello world')
})
app.post('/test',async(req , res)=>{
    const  test  = req.body.data ;
    const testCollection = await getTest(test)
    if(!testCollection){
        return res.status(500).json({message: 'Error getting collection '})
    }

    try{
        const documents = await testCollection.find().toArray();
        const questions = documents.map(document => ({
            question: document.question,
            options: document.options,
            correctAnswer: document.correctAnswer
          }));
          res.json({questions})
    }catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ message: 'Error fetching collection data' });
      }
})


app.listen(PORT,()=>{
    console.log('app listening on port' + PORT);
})