import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../components/textInput/TextInput";
import Textarea from "../components/textarea/Textarea";
import { getBlogBySlug, updateBlog } from "../api/internal";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import Loader from "../components/Loader/Loader";

function BlogUpdate() {
  const { urlSlug } = useParams();
  const { urlBlogId} = useParams();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [photo, setPhoto] = useState("");
  const [updatePhoto,setUpdatePhoto] = useState("")
  const [content, setContent] = useState("");
  const [blogData,setBlogData] = useState([])
  const author = useSelector(state => state.user._id);
  const navigate = useNavigate()

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = ()=>{
      setUpdatePhoto(reader.result)
    }
    if(file){
      reader.readAsDataURL(file)
    }
  }

  const handleBlogUpdateApi = async (e) => {
    e.preventDefault()
    e.currentTarget.innerHTML = "Updating.."
    let response;
    if(updatePhoto !== ''){
      const data = {
        title,
        content,
        slug,
        author,
        blogId:blogData._id,
        photo:updatePhoto,
      }
      response = await updateBlog(data);
      
    }
    else{
      const data = {
        title,
        content,
        slug,
        author,
        blogId:blogData._id,
      }
      response = await updateBlog(data);
    }

    if(response.status === 200){
      swal("Great", response.data.message,"success")
      navigate(`/blog/${slug}`)
      
    }else{
      console.log(response)
    }
    if (e.currentTarget) {
      e.currentTarget.innerHTML = "Update";
    }

  }

  useEffect(()=> {
    (async function getBlog (){
      const response = await getBlogBySlug(urlSlug);
      if(response.status === 200){
        setBlogData(response.data.blog)
        setTitle(response.data.blog.title)
        setSlug(response.data.blog.slug)
        setContent(response.data.blog.content)
        setPhoto(response.data.blog.photo)
      }
      else{
        console.log(response)
      }
    })();
  },[])

  if(blogData == ''){
    return <Loader text={"Blog For Updation"}/>
  }

  return (
    <div className="container mt-3">
      <h4 className="text-center">Update Blog</h4>
      <form action="mt-2">
        <label htmlFor="title" className="form-label ">Title</label>
        <TextInput
          type="text"
          name="title"
          placeholder="Enter Title"
          className="mt-0"
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
        />

        <label htmlFor="slug" className="form-label mt-3">Slug</label>
        <TextInput
          type="text"
          name="slug"
          placeholder="Enter Slug"
          className="mt-0"
          value={slug}
          onChange={(e)=> setSlug(e.target.value)}
        />

        <label htmlFor="img" className="form-label mt-2">
          Update Blog Image
        </label>
        <input type="file" name="img" className="form-control" 
        onChange={handlePhoto}/>
        {photo !== '' ? <img src={updatePhoto !==''? updatePhoto:photo} alt="image not found" className='mt-3 rounded' width={150}/>: ""}

        <label htmlFor="img" className="form-label mt-2 mb-0 d-block">Content</label>
        <Textarea
          name="content"
          cols="30"
          rows="6"
          placeholder="Write Content"
          value={content}
          className="m-0"
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="btn btn-primary mt-3" onClick={handleBlogUpdateApi}
        disabled={title == '' || slug == ''|| content == '' ? true:false}>Update</button>
      </form>
    </div>
  );
}

export default BlogUpdate;
