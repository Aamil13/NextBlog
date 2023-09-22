"use client"
import LongMenu from '@/Component/MenuDot'
import { Comment, SinglePost } from '@/Redux/Slices/PostSlice'
import { logInlocal } from '@/Redux/Slices/authSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";

const page = ({params}) => {
    const id = params.id
    const [postdata, setPostData] = useState("")
    
    const [commenttext, setCommentText] = useState("")
    const [textfull , setTextFull] = useState(false)
    const userlog = useSelector((state)=> state.authStore)
    const dispatch = useDispatch();
    // console.log(postdata?.image?.endsWith(".mp4"));
    
    useEffect(()=>{
      if(commenttext.trim().replace(/ /g, '').length >= 251){
        setTextFull(true)
      }
      else if(commenttext.trim().replace(/ /g, '').length <= 250){
        setTextFull(false)
      }
     },[commenttext])
// console.log(textfull);
    useEffect(()=>{
      if( localStorage.getItem("userID")){
        dispatch(logInlocal())
     }

    const fetch =async ()=>{
      const singlepost = await dispatch(SinglePost(id))
      
      setPostData(singlepost?.payload?.post)
    }
    fetch()
    },[])

    const isLoggedInUser = ()=>{
      if(userlog?.isLoggedIn && localStorage.getItem("userID") === postdata?.user?._id){
        return true
      }
  
      return false
    }

    const submit=()=>{
      if(!userlog?.isLoggedIn){
        return toast.warning("Log In To Comment!")
      }
      if(!commenttext || commenttext.trim() === ""){
          return toast.warn("No Comment!")
      }
      let id = postdata?._id
      // console.log(id);
      let name = userlog?.data.name || localStorage.getItem("username")
      // console.log(name);
      let userid = userlog?.data.id || localStorage.getItem("userID")
      // console.log(userid);
      let date = new Date().toLocaleDateString()
      if(!id || !name || !userid) return console.log("log in");
      postdata?.comment.push({
        comment:commenttext,
        name: name,
        userId:userid,
        date: date,})

      dispatch(Comment({id,name,userid,date,commenttext}))
      setCommentText("")
    }
  return (
    <div className='w-full h-full flex flex-col items-center justify-center mt-10'>
      <div className='w-full flex flex-col justify-center items-center gap-6'>
        <p className='font-bold text-7xl max-sm:text-3xl'>Blog Details</p>
        {
          postdata?.image?.endsWith(".mp4") ?
          <video className='w-11/12 h-[300px] ' controls src={postdata?.image}></video>
          :
          <img className='w-11/12 h-[300px] object-cover' src={postdata.image} alt="" />
        }
       
        <div className='w-full flex justify-between items-center px-20 max-sm:px-4'>
        <p>By <span className='font-bold'>{postdata?.user?.name}</span></p>
        
        <p ><span className='mx-6'>{postdata?.location}</span>{new Date(postdata?.date).toLocaleDateString()}</p>
        <div>{isLoggedInUser() && <LongMenu id={postdata?._id}/>}</div>
        </div>
        <p className='font-semibold text-2xl'>{postdata?.title}</p>
        <p className='max-w-6xl p-5'>{postdata?.description}</p>
      </div>

      {/* comments */}
      <div className=' w-full flex flex-col items-center'>
        <textarea onChange={(e)=>setCommentText(e.target.value)} className='block p-4 pr-20 w-4/6 border-cyan-600 border-2 rounded-lg ' value={commenttext}  placeholder='Enter your comment' />
          <div className='flex justify-end w-4/6 items-center max-sm:gap-8 gap-6'>
            <p className={`${textfull ? "text-red-500" : ""}`}>{commenttext?.trim().replace(/ /g, '').length}/250</p>
        <button onClick={()=>submit()} disabled ={textfull} className={`${textfull ? "bg-red-500" : "bg-green-400"} px-16 py-2 mt-2  rounded-lg`}>Post</button>
          </div>
        <div className='w-full flex flex-col items-center'>
            {
              postdata?.comment?.map((item,key)=>(
                <div key={key} className='bg-gray-100 w-4/6 p-2 my-2 shadow-lg'>
              <p className='font-semibold'>{item?.name} <span className='font-light text-xs mx-5'>{item?.date}</span></p>
              <p className='max-w-md break-words'>{item?.comment}</p>
            </div>
              ))
            }
        </div>
      </div>
    </div>
  )
}

export default page