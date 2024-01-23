import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    _id: '',
    name: '',
    username:'',
    email: '',
    auth: false,
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUser : (state,action) => {
            const {_id,name,username,email,auth} = action.payload;
            state._id = _id;
            state.name = name;
            state.username = username;
            state.email = email;
            state.auth = auth;
        },
        resetUser : (state) => {
            state._id = '',
            state.name = '',
            state.username = '',
            state.email = '',
            state.auth = ''
        },
    },
})

export const {setUser,resetUser} = userSlice.actions;

export default userSlice.reducer;