import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteBlog, getBlogBySlug,getCommentByBlogId,postCommentApi, updateBlog } from '../api/internal';
import Textarea from '../components/textarea/Textarea'
import swal from 'sweetalert';
import Loader from '../components/Loader/Loader'
import { useSelector } from 'react-redux';

function BlogBySlug() {
    const {slug} = useParams();
    const [blog,setBlog] = useState([]);
    const {_id,title,content,photo,authorName,authorId,authorUsername,createdAt} = blog;
    const [comments,setComments] = useState([]);
    const [postComment,setPostComment] = useState([]);
    const author = useSelector((state) => state.user._id)
    const ownerName = useSelector((state) => state.user.name);
    const navigate = useNavigate();
    useEffect(()=>{
      // IIFE 
      (async function getBlogApi(){
        const response = await getBlogBySlug(slug);
        if(response.status === 200){
          setBlog(response.data.blog);
          (async function getCommentByBlogIdApi(){
            const res = await getCommentByBlogId(response.data.blog._id);
            if(res.status === 200){
              setComments(res.data.comments);
            }
            else{
              console.log("Comment Api Error");
            }
          })();
        }
        else{
          swal("Error!","Error","warning");
          // console.log(response);
        }
      })();
    },[])

    const handlePostComment = async (e) => {
      e.preventDefault();
      const data = {
        content: postComment,
        blogId: _id,
        author,
      }
      const response = await postCommentApi(data);
      if(response.status === 201){
        const newComment = {
          content: postComment,
          authorName: ownerName
        }
        setComments((prev) => [...prev,newComment]);
        swal("Successfull","Comment Posted Successfully!","success")
      }
      else{
        swal("Error","Error","warning")
      }
      setPostComment([]);

    }

    if(blog == ''){
      return <Loader text={"Blog"}/>
    }
    const handleDeleteBlog = async (e) => {
      e.currentTarget.innerHTML = "Deleting..."
      const response = await deleteBlog(_id);
      if(response.status === 200){
        swal("Success","Blog Deleted Successfully!","success");
        navigate("/blogs");
      }
      else{
        swal("Error","Error","warning");
        e.currentTarget.innerHTML = "Delete"
      }
    }
    const handleUpdateBlog = async (e) => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this blog!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          const data = {
            title:"",
          }
          (async function updateBlogApi(){
            const response = await updateBlog(data);
          })();
          swal("Poof! Your blog has been deleted!", {
            icon: "success",
          });
        } 
        else {
          swal("Your blog is safe!");
        }
      });
    }
  return (
    <div className='container mt-2'>
      <div className="row">
        <div className="col-12 col-md-8 col-lg-8">
          <div className="blog-detail">
            <div className="blog-header d-flex justify-content-between">
              <h5 className=''>{title}</h5>
              {author == authorId ? <div>
                  <button className="btn btn-sm" onClick={()=> navigate(`/blog/update/${slug}/${_id}`)}><i className='bi  bi-pencil-square fs-5'></i></button>
                  <button className="btn btn-sm"   onClick={handleDeleteBlog}>
                    <i className='bi  bi-trash-fill fs-5' style={{color:"red"}}></i>
                  </button>
                </div>: ''}
            </div>
            <div><span style={{color:"var(--active-link-bgcolor)"}}>Posted By: </span>{authorName}</div>
            <img src={photo} alt="No Image" className='rounded m-3' width={"100%"}/>
            <p className="" style={{textAlign:"justify"}}>{content}</p>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-4 p-3 ps-5 mt-5" style={{height:"100vh",overflowY:"auto"}}>
          <h5>Comments</h5>
          {comments == '' ? <div className='mt-3 fw-bold text-center text-danger'>0 Comments </div>:''}
          {comments && comments.map((comment)=>(
            <div className="mt-3" style={{borderBottom:"1px solid var(--active-link-bgcolor)"}}>
              <div className="head d-flex gap-2" style={{color:"var(--active-link-bgcolor)"}}>
                <i className="bi bi-person-circle"></i>
                {comment.authorName}
              </div>
              <p className='mt-2 text-justify'>{comment.content}</p>
            </div>            
          ))}
        </div>

        <div className="col-12 col-md-8 col-lg-8">  
          <div className="post-comment">
              <h5 className='text-center mt-4'>Post Your Comment</h5>
              <form>
                <Textarea name="postCommentContent" placeholder="Write Your Comment" cols="30" rows="8"
                onChange={(e)=> setPostComment(e.target.value)}
                value={postComment}/>
                <button type='submit' className="mt-2 btn btn-primary" disabled={postComment == '' ? true:false}
                onClick={handlePostComment}>Post Comment</button>
              </form>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default BlogBySlug
