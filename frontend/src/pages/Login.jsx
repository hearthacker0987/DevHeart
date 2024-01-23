import React, { useEffect, useState } from 'react'
import TextInput from '../components/textInput/TextInput'
import { NavLink, useNavigate } from 'react-router-dom'
import LoginSchema from '../schemas/LoginSchema'
import { useFormik } from 'formik'
import {login} from '../api/internal'
import { setUser } from '../store/userSlice'
import { useDispatch } from 'react-redux'
import swal from 'sweetalert';
import { TailSpin } from 'react-loader-spinner'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isBtnDisable,setIsBtnDisable] = useState(false);
  const initialValues = {
    email: '',
    pass: '',
  }

  const handleLogin = async (values) => {
    const response = await login(values);
    if(response.status === 200){
      // setUser  update globle state
      const user = {
        _id: response.data.user._id,
        name: response.data.user.name,
        username: response.data.user.username,
        email: response.data.user.email,
        auth: true,
      }
      dispatch(setUser(user));
      setIsBtnDisable(false);
      // redirect user 
      navigate("/");
    }
    else if(response.code === 'ERR_BAD_REQUEST'){
      swal('Error!',response.response.data.message,'warning')
      setIsBtnDisable(false);
    }
    // else if(response.response.data.status === 422){
    //   swal('Error!',response.response.data.message,'warning')
    //   setIsBtnDisable(false);
    // }
    else{
      console.log(response)
    }

  }

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit:(values)=>{
      setIsBtnDisable(true);
      const data = {
        email: values.email,
        password: values.pass
      }
      handleLogin(data);
    }
  });

  return (
    <div className='d-flex flex-column align-items-center mt-4'>
      <h4 className='text-center'>Login To Your Account</h4>
      <form className=' mt-3' style={{minWidth:"32%"}} onSubmit={formik.handleSubmit}>
        <TextInput 
          type="email"
          name="email" 
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email && formik.touched.email ? 1 : undefined}
          errormessage={formik.errors.email}
          className={formik.errors.email && formik.touched.email ? "invalid" : ""}
        />
        <TextInput
          type="password"
          name="pass" 
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.pass && formik.touched.pass ? 1 : undefined}
          errormessage={formik.errors.pass} 
          className={formik.errors.pass && formik.touched.pass ? "invalid" : ""}         
        />
        <div className='d-flex justify-content-end'>
          <NavLink to="/forget-password" className="nav-link text-primary">
            <div>Forget Password?</div> 
          </NavLink>
        </div>
        <button type='submit' className='btn btn-primary text-center w-100 mt-2 d-flex align-items-center justify-content-center'
        disabled={isBtnDisable || !formik.values.email || !formik.values.pass || formik.errors.email ||formik.errors.pass ? true: false }>
          Login {isBtnDisable && <span className='ms-2'><TailSpin  width="30" height="15" color="#ffff" radius="4" /></span>}
        </button>
        <div className="mt-3">
          Don't have an account?&nbsp;
          <NavLink to="/sign-up" className="text-primary">
             Sign Up
          </NavLink>
        </div>

      </form>
    </div>
  )
}

export default Login
