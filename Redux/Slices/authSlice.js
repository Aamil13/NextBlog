import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const SignUp = createAsyncThunk(
    "Signup",
    async(data)=>{
        try {
            const res = await axios.post("https://blog-backend-v1.vercel.app/user/signup",{
                name:data.name,
                email:data.email,
                password:data.password
            })
            const resdata = await res.data
            toast.success("Successful")
        return resdata
        } catch (error) {
          
            toast.error(error.response.data.message)
            state.isLoading = false
        }       
    }
)

export const LogIn = createAsyncThunk(
    "Login",
    async(data)=>{
        try {
            const res = await axios.post("https://blog-backend-v1.vercel.app/user/login",{
                email:data.email,
                password:data.password
            })
            const resdata = await res.data
            // console.log(resdata)
            toast.success(resdata?.message)
        return resdata
        } catch (error) {
       toast.error(error.response.data.message)
        state.isLoading = false
        }       
    }
    
)

export const UserInfoCall = createAsyncThunk(
    "userinfocall",
    async(id)=>{
        try {
            const res = await axios.get(`https://blog-backend-v1.vercel.app/user/${id}`)
            // console.log(res.data);
            return res.data
        } catch (error) {
            console.log(error);
        }
    }
)




const authSlice = createSlice({
    name: "auth",
    initialState:{
        isLoading:false,
        data:[],
        info:[],
        isError:false,
        isLoggedIn: false
    },
    reducers:{
        // UserInfo:(state,action)=>{
        //     state.info = action.payload
        // }

        logInlocal:(state,action)=>{
            state.isLoggedIn = true
        },

        logOut:(state,action)=>{
            localStorage.removeItem("userID")
            state.isLoggedIn = false
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(SignUp.pending,(state,action)=>{
            state.isLoading = true
        }),
        builder.addCase(SignUp.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isLoggedIn = true
            state.data = action.payload
            localStorage.setItem("userID",state.data.users._id)
        }),
        builder.addCase(SignUp.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
        }),
        builder.addCase(LogIn.pending,(state,action)=>{
            state.isLoading = true
            
        }),
        builder.addCase(LogIn.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isLoggedIn = true
            state.data = action.payload
            localStorage.setItem("userID",state.data.id)
            localStorage.setItem("username",state.data.name)
        }),
        builder.addCase(LogIn.rejected,(state,action)=>{
            state.isLoading = false
            state.isError =true
        }),
        builder.addCase(UserInfoCall.fulfilled,(state,action)=>{
            state.info = action.payload
        })
    }
})

export const {logOut,logInlocal} = authSlice.actions
export default authSlice.reducer