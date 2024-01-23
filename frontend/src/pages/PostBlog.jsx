import React, { useState } from 'react'
import TextInput from '../components/textInput/TextInput'
import Textarea from '../components/textarea/Textarea'
import { submitBlog } from '../api/internal'
import { useFormik } from 'formik'
import SubmitBlogSchema from '../schemas/SubmitBlogSchema'
import { useSelector } from 'react-redux'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'

function PostBlog() {
  const [title,setTitle] = useState("")
  const [slug,setSlug] = useState("")
  const [photo,setPhoto] = useState("")
  const [content,setContent] = useState("")
  const author = useSelector(state => state.user._id)
  const navigate = useNavigate();
  const [isBtnDisable,setIsBtnDisable] = useState(false);

  // const getPhoto = (e) => {
  //   let file = e.target.files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPhoto(reader.result);
  //   }
  // }
  const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result);
    }
    if(file){
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsBtnDisable(true);
    const data = {
      title,
      content,
      photo,
      slug,
      author
    }

    const response = await submitBlog(data);
    if(response.status === 201){
      setIsBtnDisable(false)
      swal("Great","Blog Posted!","success");
      navigate('/');
    }
    else{
      // swal("Error","Error!","warning");
      console.log(response)
      setIsBtnDisable(false);
    }

  }

  return (
    <div className='container d-flex flex-column align-items-center'>
      <h4 className='mt-3 text-center'>Create New Blog</h4>
      <form className="mt-3" style={{minWidth:"40%"}} >
        <TextInput 
          type="text" 
          name="title" 
          placeholder="Enter Title"
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
        />
        <TextInput 
          type="text" 
          name="slug" 
          placeholder="Enter Slug"
          value={slug}
          onChange={(e)=> setSlug(e.target.value)}
        />
        
        <label htmlFor="img" className="form-label mt-3">Select Blog Image</label>
        <input type="file" name="img" id="img" className='form-control' onChange={getPhoto}
        accept='image/jpg,image/jpeg,image/png'/>
        {photo !== '' ? <img src={photo} alt="image not found" className='mt-3 rounded' width={130}/>: ""}

        <Textarea name="content" cols="30" rows="10" placeholder="Write Content"
        value={content}
        className="mt-2"
        onChange={(e)=> setContent(e.target.value)}/>
        <button type="submit" className='btn btn-primary mt-3 w-100 d-flex align-items-center justify-content-center'
        onClick={handleFormSubmit}
        disabled={title == '' || content == '' || slug == '' || photo == '' ? true:false}>
          Post {isBtnDisable && <span className='ms-2'><TailSpin  width="30" height="15" color="#ffff" radius="4" /></span>}
        </button>
      </form>
    </div>
  )
}

export default PostBlog
