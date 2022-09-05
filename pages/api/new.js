import  {MongoClient } from 'mongodb';

async function handler(req,res){ 
    if(req.method === 'POST'){
        const data = req.body;

        const client = await MongoClient.connect(
           'mongodb+srv://enas:enas123@cluster0.vtlqonc.mongodb.net/?retryWrites=true&w=majority'
            );
        const db = client.db();
        const meetupsCollection =await db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        
        res.status(201).json({message:'Meetup inset successful'});
        client.colse();
    }
}
export default handler;