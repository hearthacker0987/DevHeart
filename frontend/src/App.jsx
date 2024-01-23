import { useState } from 'react'
import './App.css'
import './css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// import Navbar from './components/navbar/Navbar'
import Navbar2 from './components/navbar/Navbar2'
import Footer from './components/footer/Footer'
import Home from './pages/Home'
import './css/color.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Crypto from './pages/Crypto'
import Blogs from './pages/Blog/Blogs'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Protected from './components/protected/Protected'
import Error404 from './components/errorPage/Error404'
import PostBlog from './pages/PostBlog'
import Contact from './pages/Contact'
import { useSelector } from 'react-redux'
import BlogBySlug from './pages/BlogBySlug'
import BlogUpdate from './pages/BlogUpdate'
import useAutoLoading from './hooks/useAutoLogin'
import Loader from './components/Loader/Loader'
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
function App() {
  // const {isAuth,setIsAuth} = useState(true);
  const isAuth = useSelector(state => state.user.auth);
  const loading = useAutoLoading();
  return loading ? (
    <Loader text="..." />
  ) :(
    <>
      <BrowserRouter>
        <div className='layout'>
          <Navbar2/>
              <div className="container main">
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/crypto' element={<Crypto/>}/>
                    <Route path='/blogs' 
                    element=
                    {
                      <Protected isAuth={isAuth}>
                        <Blogs/>
                      </Protected>
                      } 
                      />
                    <Route path='/post-blog' element={
                      <Protected isAuth={isAuth}>
                        <PostBlog/>
                      </Protected>
                    } />
                    <Route path='/blog/:slug' element={
                      <Protected isAuth={isAuth}>
                        <BlogBySlug/>
                      </Protected>
                    }/>
                    <Route path='/blog/update/:urlSlug/:urlBlogId' element={
                      <Protected isAuth={isAuth}>
                        <BlogUpdate/>
                      </Protected>
                    }/>
                    <Route path='/login' element={<Login/>} />
                    <Route path='/sign-up' element={<SignUp/>} />
                    <Route path='contact-us' element={<Contact/>}/>
                    <Route path='*' element={<Error404/>} />
                </Routes>
              </div>
          <Footer/>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
