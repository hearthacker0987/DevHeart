import React, { useState } from 'react'
import TextInput from '../components/textInput/TextInput'
import Textarea from '../components/textarea/Textarea'

function Contact() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [query,setQuery] = useState("");
  return (
    <div className='container mt-2 d-flex flex-column align-items-center'>
      <h4 className='text-center'>Reach Us</h4>
      <form className='mt-2' style={{minWidth:"50%"}}>
        <TextInput text="text" placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}/>
        <TextInput text="email" placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}/>
        <label htmlFor="message" className='mt-2'>Your Query</label>
        <Textarea cols="30" rows="10" placeholder="Write Your Message"
        onChange={(e) => setQuery(e.target.value)}/>
        <button 
          type='button' 
          className='btn btn-primary mt-2'
          >Send</button>
      </form>
    </div>
  )
}

export default Contact
