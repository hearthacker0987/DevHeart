import React, { useEffect, useState } from 'react'
import styles from './Blog.module.css';
import { getAllBlogs } from '../../api/internal';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

function Blogs() {
  const [blogData,setBlogData] = useState([]);

  useEffect(()=>{
    // IIFE 
    (async function blogApi(){
      const response = await getAllBlogs();
      if(response.status === 200){
        setBlogData(response.data.blogsData);
      }
      else{
        console.log("api error")
      }
    })();
  },[])

  if(blogData.length == 0){
    return <Loader text="Blog Page"/>
  }
  return (
    <div className='container'>
      <h4 className='text-center mt-3'>My Blogs</h4>
       <div className={styles.blogWrapper}>
          {blogData && blogData.map((blog)=>(
            <NavLink to={`/blog/${blog.slug}`} className="w-100 d-flex justify-content-center nav-link" key={blog.slug}>
              <div className={styles.blog}>
                <h5>{blog.title}</h5>
                <img src={blog.photo} alt="No" className='rounded'/>
                <p className="content">{blog.content.slice(0,200)}</p>
              </div>
            </NavLink>
          ))}
       </div>
    </div>
  )
}

export default Blogs
