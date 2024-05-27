import { Button, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() =>{
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
    {landlord && (
      <>
      <h1 className='text-slate-500 text-2xl'>Contact Person</h1>
      <div className='flex flex-col gap-2'>
        <p>
          Contact <span className='font-semibold text-slate-600'>{landlord.username}</span>{' '} for{' '}
          <span className='font-semibold text-slate-600'>{listing.name.toLowerCase()}</span>
          </p>
          <Textarea 
          name='message' id='message'
          rows='2' 
          value={message} onChange={onChange} placeholder='Enter your message here...' className='w-full border p-3 rounded-tr-xl'/>
          <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            
        ><Button outline gradientDuoTone="greenToBlue" className='w-full mt-3'> Send Message </Button></Link>
        
      </div>
      </>
      
    )}
    </>
  )
}