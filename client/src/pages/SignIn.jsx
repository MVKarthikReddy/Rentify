import { Alert,  Button, Label,Spinner, TextInput } from 'flowbite-react'
import  { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link , useNavigate} from 'react-router-dom';
import family from '../assets/family.png';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData,setFormData] =useState({});
  const {loading,error:errorMessage} =useSelector(state => state.user);
   //why we  are using selector here? because we want to access 
   const dispatch =useDispatch();
   //useNavigate for navigate to sign in page
  const navigate =useNavigate();


  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value.trim() })//who trims whitespaces at beginning and end of values
  }

  //handlesubmit and using async for handling promise
  // because it take  time to submit data to the server
  const handleSubmit =async (e) => {
    e.preventDefault();
    if( !formData.email || !formData.password){
      return  dispatch(signInFailure("Please fill all fields!"));
    }
    try {
      dispatch(signInStart());//dispatching action to store that we start to load the data
      //here have some problem front end run in localhost 5173
      //and back end run in localhost 3000 
      //so add proxy in vite config 
      const res = await fetch('/api/auth/signin',{
        method:'POST',  
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData),
      })
      //convert the data 
      const  data=await res.json();
       //check same name  or email already exist
       if(data.success===false){
        dispatch(signInFailure(data.message));
      }

      //once all done successfully then navigate in sign-in page
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }

    } catch (error) {
      //This error for client side network issue 
      dispatch(signInFailure(error.message));
      
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <h1 className='text-center text-2xl mb-2 font-bold text-blue-700'>Sign In</h1>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
          {/* this is for left side */}
          <div className='flex-1'>
          <Link to='/' className=' font-bold dark:text-white text-4xl'>
              <img src={family} alt='family' className='w-[480px] h-[300px] rounded-s-lg shadow-md' />
          </Link>
          <p className='text-sm mt-5'>
          This is my first  Gatsby site.You  can sign in here.
        </p>
          </div>
          {/*  this is for right side */}
          <div className='flex-1'>
              <form  className='flex flex-col gap-4' onSubmit={handleSubmit} method="post" >
              <div>
              <Label value='Email'></Label>
              <TextInput  type='email' placeholder='xyz@gmail.com' onChange={handleChange} id='email'  />
              </div>
              <div >
              <Label value='Password'></Label>
              <TextInput  type='password' placeholder='password' onChange={handleChange} id='password'  />
              </div>
              <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading} >{/* disabled-- to avoid lot submision in signup */}
              {
               loading ? 
               (
                  <>
                    <Spinner />
                  <span className='pl-3'>Loading...</span>
                  </>
               ) :('Sign In')
               }
             
            </Button>
            <OAuth />
              </form>
              <div className='flex gap-2 text-sm mt-5'>
              <span>Dont Have an Account ?</span>
              <Link to='/sign-up' className='text-blue-500'>Sign up</Link>
              </div>
              {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
           
          </div>
      </div>
    </div>
  )
}
