import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_REACT_INTERNAL_API_BASE_URL,
    withCredentials: true,   //for enable cookies 
    headers: {
        'Content-Type' : 'application/json'
    }
});

export const login = async (data) => {
    let response;

    try {
        response = await api.post("/login",data)
    } 
    catch (error) {
        return error;
    }            

    return response;
}

export const signup = async (data) => {
    let response;
    try {
        response = await api.post('/register',data);
    } catch (error) {
        return error;
    }
    return response;
}

export const signOut = async () => {
    let response;

    try {
        response = await api.post("/logout");
    } catch (error) {
        return error
    }

    return response;
}

export const getAllBlogs = async () => {
    let response;
    try {
        response = api.get('blog/all');        
    } catch (error) {
        return error;
    }
    return response;
}

export const getBlogBySlug = async (slug) => {
    let response;
    try {
        response = await api.get(`blog/${slug}`);
    } catch (error) {
        return error;
    }
    return response;
}

export const getCommentByBlogId = async (blogId) => {
    let response;
    try {
        response = await api.get(`/comments/get/${blogId}`,{
            validateStatus: false,
        });
    } catch (error) {
        return error;
    }
    return response;
}
export const postCommentApi = async (data) => {
    let response;
    try {
        response = await api.post('/comment/create',data)
    } catch (error) {
        return error
    }
    return response;
}

export const deleteBlog = async (blogId) => {
    let response;
    try {
        response = await api.delete(`/blog/delete/${blogId}`)
    } catch (error) {
        return error;
    }
    return response;
}

export const updateBlog = async (data) => {
    let response;
    try {
        response = await api.put(`/blog/update/`,data);
    } catch (error) {
        return error
    }
    return response
}

export const submitBlog = async (data) =>{
    let response;
    try {
        response = await api.post("blog/create",data)
    } catch (error) {
        return error
    }
    return response;
}

// Auto Token Refresh using axois interceptors  
// protected resource => 401
// refresh token => return authenticated state
// protected resource resume

api.interceptors.response.use(
    (config) => config,
    async (error) => {
        let originalReq = error.config
         // extract the value of message from json response if it exists
        const errorMessage = error.response && error.response.data && error.response.data.message;

        // refresh token api 
        if(errorMessage === 'Unauthorized' && (error.response.status === 401 || error.response.status === 500) && originalReq && !originalReq._isRetry)
        {
            originalReq._isRetry = true;
            try {
                await axios.get(`${import.meta.env.VITE_REACT_INTERNAL_API_BASE_URL}/refresh`,{
                withCredentials:true
                    }
                )
                return api.request(originalReq)
            } catch (error) {
                return error;
            }
        }
        throw error // it must be use
    }
)

