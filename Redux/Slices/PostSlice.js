import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchPost = createAsyncThunk(
    "fetchAllPosts",
    async(page)=>{
       try {
        const res = await axios.get(`https://blog-backend-v1.vercel.app/posts/?page=${page}`)
        console.log(res);
        return res.data
       } catch (error) {
            console.log(error);
       }
    }
)

export const createPost = createAsyncThunk(
    "createPost",
    async(data)=>{
        try {
            const res = await axios.post("https://blog-backend-v1.vercel.app/posts",{
                title: data.title,
                description: data.description,
                image: data.image,
                location: data.location,
                date: data.date,
                user: localStorage.getItem("userID")
            })
            return res.data
        } catch (error) {
            return toast.error(error)
        }
    }
)

export const SinglePost = createAsyncThunk(
    "singlePost",
    async(id)=>{
        // console.log(id);
        try {
            const res =  await axios.get(`https://blog-backend-v1.vercel.app/posts/${id}`)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const EditPost = createAsyncThunk(
    "editPost",
    async(data)=>{
    // console.log("sasd",data.id);
        try {
            // console.log(`update id =>`, data.id);
            const res = await axios.put(`https://blog-backend-v1.vercel.app/posts/${data.id}`,{
                title: data.title,
                description: data.description,
                location: data.location,
            })
            toast.success(res?.data?.message)
            return res?.data

        } catch (error) {
            console.log(error);
        }
    }
) 

export const deletePost = createAsyncThunk(
    "deletePost",
    async(id)=>{
        try {
            const res = await axios.delete(`https://blog-backend-v1.vercel.app/posts/${id}`,)
            toast.info(res.data.message);
        return res.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const Comment = createAsyncThunk(
    "Commnetonpost",
    async({id,name,userId,date,commenttext})=>{
        try {
            const res = await axios.put(`https://blog-backend-v1.vercel.app/posts/comment/${id}`,{
                comment:commenttext,
                name: name,
                userId:userId,
                date: date,
                
            })
            toast.info(res.data.message);
        return res.data
        } catch (error) {
            console.log(error);
        }
    }
)




const postSlice = createSlice({
    name: "post",
    initialState:{
        isLoading: false,
        data: [],
        isError: false,
        count: ""
       
    },
    reducers:{
        clear:{
            
        }
    },
    extraReducers:(builder)=>{
            builder.addCase(fetchPost.pending,(state)=>{
                state.isLoading = true
            }),
            builder.addCase(fetchPost.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.data = action.payload.posts;
                state.count = action.payload.count;
            }),
            builder.addCase(fetchPost.rejected,(state)=>{
                state.isLoading = false;
                state.isError = true;
            })
    }
})

export default postSlice.reducer