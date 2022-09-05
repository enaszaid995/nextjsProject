import MeetupDetail from '../../components/meetups/MeetupDetails'
import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';
function MeetupDetails(props) {
  

  return<Fragment>
    <Head>
      <title>{props.meetupData.title}</title>
      <meta name='description' content={props.meetupData.title}/>
    </Head>
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
     
    />
  </Fragment>
}
export async function getStaticPaths(){
  const client = await MongoClient.connect(
    'mongodb+srv://enas:enas123@cluster0.vtlqonc.mongodb.net/?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  
    

    // [
    //   {params:{
    //     meetupId:'m1'
    //   }},
    //   {params:{
    //     meetupId:'m2'
    //   }},
    // ]
  }
}
export async function getStaticProps(context){
  const meetupId = context.params.meetupId;
  //fetch data
  const client = await  MongoClient.connect(
    'mongodb+srv://enas:enas123@cluster0.vtlqonc.mongodb.net/?retryWrites=true&w=majority'
  );

  const db = client.db();
  const meetupCollection = db.collection('meetups');
  const result = await meetupCollection.findOne({_id: ObjectId(meetupId),
  });
  client.close();

  return{
    
    props:{
      meetupData:{
        id:result._id.toString(),
        image:result.image,
        title:result.title,
        address:result.address,
      }    
},
    
    revalidate:3600
  }
}
export default MeetupDetails;