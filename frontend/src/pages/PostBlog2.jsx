import React, { useState } from 'react'
import TextInput from '../components/textInput/TextInput'
import Textarea from '../components/textarea/Textarea'
import { submitBlog } from '../api/internal'
import { useFormik,setFieldValue } from 'formik'
import SubmitBlogSchema from '../schemas/SubmitBlogSchema'
import { useSelector } from 'react-redux'
import swal from 'sweetalert'

function PostBlog() {
  const [photo,setPhoto] = useState('');
  const auth_id = useSelector(state => state.user._id)
  const initialValues = {
    title:'',
    slug:'',
    img:'',
    content:'',
  }
  // const getPhoto = (e) => {
  //   let file = e.target.files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPhoto(reader.result);
  //   }
  // }
  const handleBlogApi = async (data) => {
    const response = await submitBlog(data);
    if(response.status === 201){
      swal("Great","Blog Posted!","success");
    }
    else{
      swal("Error","Error!","warning");
      // console.log(response);

    }
  }
  const formik = useFormik({
    initialValues,
    validationSchema: SubmitBlogSchema,
    onSubmit: (values) => {
      const data = {
        title: values.title,
        content: values.content,
        photo: values.img,
        slug: values.slug,
        author: auth_id,
      }
      console.log(data);
      // handleBlogApi(data);
    }
  })
  return (
    <div className='container d-flex flex-column align-items-center'>
      <h4 className='mt-3 text-center'>Create New Blog</h4>
      <form className="mt-3" style={{minWidth:"40%"}} onSubmit={formik.handleSubmit}>
        <TextInput 
          type="text" 
          name="title" 
          placeholder="Enter Title"
          onChange={formik.handleChange}
        />
        <TextInput 
          type="text" 
          name="slug" 
          placeholder="Enter Slug"
          onChange={formik.handleChange}
        />
        <label htmlFor="img" className="form-label mt-3">Select Blog Image</label>
        <input type="file" name="img" id="img" className='form-control'
          onChange={(e)=>{setFieldValue("img",e.currentTarget.files[0])}}/>
        <Textarea name="content" cols="30" rows="10" placeholder="Write Content"
          onChange={formik.handleChange}/>
        <button type="submit" className='btn btn-primary mt-3 w-100'>Post</button>
      </form>
    </div>
  )
}

export default PostBlog
