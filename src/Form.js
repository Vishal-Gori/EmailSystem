import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Form() {

  const [userData,setUserData] = useState({
    name:'',
    email:'',
    phone:'',
    gender:'Male',
    subject:'',
    message:''
  });

  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    try{
      Axios.post('https://emailer-system-backend-eah09bkcc-vishal-gori.vercel.app/sendmail',{
        email:userData.email,
        subject:userData.subject,
        message:{
          name:`${userData.name}`,
          gender:`${userData.gender}`,
          phone:`${userData.phone}`,
          message:`${userData.message}`
        }
      }).then((response)=>{
        setUserData({
            name:'',
            email:'',
            phone:'',
            gender:'Male',
            subject:'',
            message:''
          });
        navigate('/')
    }).catch((err)=>console.log(err));
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div id='main-div'>
      <div id='new-root'>
        <h1 style={{"color":"blue"}}>Contact Us</h1>
      </div>
      <form onSubmit={handleSubmit}>
          <div className='form-inp'>
            <h3>Name</h3>
            <input type='text' placeholder='Name' className='inp' value={userData.name} id='len' onChange={(e)=>setUserData({
              ...userData,
              name:e.target.value
            })} />
          </div>
          <div className='form-inp'>
            <h3>Phone number</h3>
            <input type='tel' placeholder='Phone number' className='inp' value={userData.phone} id='len' onChange={(e)=>setUserData({
              ...userData,
              phone:e.target.value
            })} />
          </div>
          <div className='form-inp'>
            <h3>Gender</h3>
            <div id='gender-div'>
              <input type='radio' name='gender' checked onClick={(e)=>setUserData({
                ...userData,
                gender:'Male'
              })} />&nbsp;Male&nbsp;&nbsp;
              <input type='radio' name='gender' onClick={(e)=>setUserData({
                ...userData,
                gender:'Female'
              })} />&nbsp;Female&nbsp;&nbsp;
              <input type='radio' name='gender' onClick={(e)=>setUserData({
                ...userData,
                gender:'Other'
              })} />&nbsp;Other
            </div>
          </div>
          <div className='form-inp'>
            <h3>Email</h3>
            <input type='email' placeholder='Email address' className='inp' id='len' required value={userData.email} onChange={(e)=>setUserData({
              ...userData,
              email:e.target.value
            })} />
          </div>
          <div className='form-inp'>
            <h3>Subject</h3>
            <textarea type='text' placeholder='Subject of message' required className='inp' value={userData.subject} onChange={(e)=>setUserData({
              ...userData,
              subject:e.target.value
            })} />
          </div>
          <div className='form-inp'>
            <h3>Message</h3>
            <textarea type='text' placeholder='Message' required className='inp' value={userData.message} onChange={(e)=>setUserData({
              ...userData,
              message:e.target.value
            })} style={{"minHeight":"100px"}} />
          </div>
          <div className='form-inp'>
            <button type='submit' className='btn'>Submit</button>
          </div>
      </form>
    </div>
  );
}

export default Form;
