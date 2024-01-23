import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {setUser} from '../store/userSlice';
function useAutoLogin() {
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();

  useEffect(()=>{
    // IIFE 
    (async function refresh(){
        try {
            let response = await axios.get(`${import.meta.env.VITE_REACT_INTERNAL_API_BASE_URL}/refresh`,{
                withCredentials:true,
            });
            if(response.status === 200){
                const user = {
                    _id: response.data.user._id,
                    name: response.data.user.name,
                    username: response.data.user.username,
                    email: response.data.user.email,
                    auth: response.data.auth,
                }
                dispatch(setUser(user));
            }
        } catch (error) {
            console.log(error)
        }
        finally{  //its must run in both case i.e try or catch
            setLoading(false)
        }
    })();
  },[])

  return loading;
}

export default useAutoLogin