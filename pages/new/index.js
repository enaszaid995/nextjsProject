import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';

const MeetupForm =()=>{
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    
    // const settings = {
    //     method: 'POST',
    //     body: JSON.stringify(enteredMeetupData),
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     }
    // };
    // try {
    
    //       const fetchResponse = await fetch('/api/new/', settings);
    //     const data = await fetchResponse.json();
    //     console.log(data);
    //     router.push('/');
    //     return data;
        
    

    // } catch (e) {
    //     return e;
    // }    
    
    const response = await fetch('/api/new', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data =  response.json();

    console.log(data);

    router.push('/');
  
  }
    return <NewMeetupForm onAddMeetup={addMeetupHandler}/>
}
export default MeetupForm;