import React from 'react'
import TextInput from '../components/textInput/TextInput'
import { NavLink } from 'react-router-dom'
import SignUpSchema from '../schemas/SignUpSchema'
import { useFormik } from 'formik'
import { signup } from '../api/internal'
import swal from 'sweetalert'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../store/userSlice'
import { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isBtnDisable,setIsBtnDisable] = useState(false);
  const initialValues = {
    name: '',
    username: '',
    email: '',
    pass: '',
    cpass: ''
  }

  const handleSignUp = async (data) => {
    const response = await signup(data);
    if(response.status === 200){
      setIsBtnDisable(false);
      // setUser 
      const user = {
        _id: response.data.user._id,
        name: response.data.user.name,
        username:response.data.user.username,
        email:response.data.user.email,
        auth:true,
      }
      dispatch(setUser(user));
      // redirect 
      navigate("/");
    }
    else if(response.code === "ERR_BAD_REQUEST"){
      swal('Error!',response.response.data.message,'warning');
      setIsBtnDisable(false);
    }
  }


  const formik = useFormik({
    initialValues,
    validationSchema:SignUpSchema,
    onSubmit: (values)=>{
      setIsBtnDisable(true);
      const data = {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.pass,
        confirmPassword: values.cpass
      }
      handleSignUp(data);
    }
  })
  return (
    <div className='d-flex flex-column align-items-center mt-4'>
      <h4 className='text-center'>Create Your Account</h4>
      <form className=' mt-3' style={{minWidth:"32%"}} onSubmit={formik.handleSubmit}>
        <TextInput 
          type="text"
          name="name" 
          placeholder="Enter Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.name && formik.touched.name ? 1 : undefined}
          errormessage={formik.errors.name}
          className={formik.errors.name && formik.touched.name ? 'invalid' : ''}
        />
        <TextInput
          type="text"
          name="username" 
          placeholder="Enter Username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.username && formik.touched.username ? 1 : undefined}
          errormessage={formik.errors.username}
          className={formik.errors.username && formik.touched.username ? 'invalid' : ''}
        />
        <TextInput
          type="email"
          name="email" 
          placeholder="Enter Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email && formik.touched.email ? 1 : undefined}
          errormessage={formik.errors.email}
          className={formik.errors.email && formik.touched.email ? 'invalid' : ''}
        />
        <TextInput
          type="password"
          name="pass" 
          placeholder="Enter Strong Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.pass && formik.touched.pass ? 1 : undefined}
          errormessage={formik.errors.pass}
          className={formik.errors.pass && formik.touched.pass ? 'invalid' : ''}
        />
        <TextInput
          type="password"
          name="cpass" 
          placeholder="Repeat-Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.cpass && formik.touched.cpass ? 1 : undefined}
          errormessage={formik.errors.cpass}
          className={formik.errors.cpass && formik.touched.cpass ? 'invalid' : ''}
        />
        <button type='submit' className='btn btn-primary text-center w-100 mt-2 d-flex align-items-center justify-content-center'
        disabled={
          !formik.values.name||
          !formik.values.username||
          !formik.values.email||
          !formik.values.pass||
          !formik.values.cpass||
          formik.errors.name||
          formik.errors.username||
          formik.errors.email||
          formik.errors.pass||
          formik.errors.cpass ? true: false}>
            Sign Up {isBtnDisable && <span className='ms-2'><TailSpin  width="30" height="15" color="#ffff" radius="4" /></span>}
          </button>
        <div className="mt-3">
          Already have an account?&nbsp;
          <NavLink to="/login" className="text-primary">
            Login
          </NavLink>
        </div>

      </form>
    </div>
  )
}

export default SignUp
