import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {resetUser} from "../../store/userSlice";
import { signOut } from "../../api/internal";
function Navbar2() {
  let isAuthenticated = useSelector(state => state.user.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSigOut = async () => {
    const response = await signOut();
    if(response.status === 200){
      // resetUser state 
      dispatch(resetUser());
      // redirect 
      navigate("/login");
    }
    else{
      swal("Error","Error",'warning')
    }

  }
  return (
    <>
      <nav className="py-2 bg-dark border-bottom text-white">
        <div className="container d-flex flex-wrap align-items-center">
            <div className="me-auto">
                Phone Number <span>03036985755</span>
            </div>
          <ul className="nav">
            {!isAuthenticated && <div className="d-flex">
              <li className="nav-item">              
                <NavLink to="/login" className={({isActive}) => (isActive ? 'nav-link me-1 active text-white' : 'nav-link me-1 inActive text-white')}>
                  Login
                </NavLink>
                {/* <button type="button" className="btn login-btn" data-bs-toggle="modal"      data-bs-target="#login">
                  Login
                </button> */}
              </li>
              <div className="ms-1 me-1" style={{border:"1px solid red"}}></div>
              <li className="nav-item ">
                {/* <button type="button" className="btn sign-up-btn" data-bs-toggle="modal"      data-bs-target="#sign-up">
                  Sign Up
                </button> */}
                <NavLink to="/sign-up" className={({isActive}) => (isActive ? 'nav-link active text-white' : 'nav-link inActive text-white')}>Sign Up</NavLink>
              </li>
            </div>
            }

           {isAuthenticated &&  <li className="nav-item" onClick={handleSigOut}>
              <a href="#" className="nav-link btn btn-primary" style={{color:"var(--btn-color)"}}>
                Logout
              </a>
            </li>
            }

          </ul>
        </div>
      </nav>
      <header className="py-3 mb-4" style={{borderBottom: "1px solid var(--active-link-bgcolor)"}}>
        <div className="container d-flex flex-wrap justify-content-center">
            <a href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none" previewlistener="true">
                <span className="fs-4 fw-bold" style={{color:'var(--active-link-bgcolor)'}}>DevHeart</span>
            </a>
            <ul className="nav me-auto">
                <li className="nav-item">
                  <NavLink
                      to="/"
                      exact="true"
                      // className={(isActive) =>(isActive ? 'active' : 'inActive')  `nav-link link-body-emphasis px-2 `}
                      className={({ isActive }) => (isActive ? 'active nav-link px-2' : 'inActive nav-link px-2 ')}
                      aria-current="page"
                  >
                      Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/crypto" className={({isActive}) => (isActive ? 'active nav-link px-2' : 'inActive nav-link px-2' )}>
                      Crypto Currency
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="blogs" className={({isActive}) => (isActive? 'active nav-link px-2' : 'inActive nav-link px-2')}>
                      Blog
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/post-blog" className={({isActive}) => (isActive? 'active nav-link px-2' : 'inActive nav-link px-2')}>
                      Post Blog
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="contact-us" className={({isActive}) => (isActive? 'active nav-link px-2' : 'inActive nav-link px-2')}>
                      Contact Us
                  </NavLink>
                </li>
            </ul>
        </div>
      </header>


      {/* Login Model  */}
      {/* <div className="modal fade" id="login" tabIndex="-1" aria-labelledby="loginLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="loginLabel">Login</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mt-2">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" name="email" id="email" className="form-control" />
                </div>
                <div className="mt-2">
                  <label htmlFor="pass" className="form-label">Password</label>
                  <input type="password" name="pass" id="pass" className="form-control" />
                  <div className="d-flex justify-content-end">
                    <NavLink to="forget-password" className="nav-link text-primary"
                    >
                      <div>Forget Password?</div> 
                    </NavLink>
                  </div>
                </div>
              </form>
            </div>
            <div className="p-3">
              <button type="button" className="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Sign Up Modal  */}
      {/* <div className="modal fade" id="sign-up" tabIndex="-1" aria-labelledby="sign-upLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="sign-upLabel">Sign Up</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form >
                <div className="mt-2">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" name="name" id="name" className="form-control"/>
                </div>
                <div className="mt-2">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" name="email" id="email" className="form-control"/>
                </div>
                <div className="mt-2">
                  <label htmlFor="pass" className="form-label">Password</label>
                  <input type="password" name="pass" id="pass" className="form-control"/>
                </div>
                <div className="mt-2">
                  <label htmlFor="cpass" className="form-label">Repeat-Password</label>
                  <input type="password" name="cpass" id="cpass" className="form-control"/>
                </div>
              </form>
            </div>
            <div className="p-3">
              <button type="button" className="btn btn-primary">Sign Up</button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Navbar2;
