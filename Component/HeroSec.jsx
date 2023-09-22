"use client"
import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NewPost from './NewPost';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logInlocal } from '@/Redux/Slices/authSlice';

const HeroSec = () => {
  const [open, setOpen] = React.useState(false);
  const auth = useSelector((state)=>state.authStore)
  const dispatch = useDispatch() 
  const handleOpen = async(value) => 
  {
   
    if(!auth.isLoggedIn){
      
     return  toast.warning("Please Log in to create Post!")
    }
    setOpen(true)
  //  let singleart =  await dispatch(SingleArticle(value))
  
  //  setArticle(singleart.payload.blog)
  }
  
  const handleClose = () => setOpen(false);

  useEffect(()=>{
    if( localStorage.getItem("userID")){
       dispatch(logInlocal())
    }
   },[])


  return (
    <>
    <div style={{width:"100%",textAlign:"center",paddingTop:"100px", paddingBottom:"100px"}}>
        <Typography color={'secondary'} variant="h5" component="h2">
            Express your Thoughts at 
        </Typography>
        <Typography   variant="h3" component="h2">
            WORDS.inc
        </Typography>
      <AddCircleOutlineIcon onClick={()=>handleOpen()} sx={{position:"absolute",left:"10px"}} fontSize='large' color='primary'/>
    </div>
    <NewPost Open={open} close={handleClose} />
    </>
  )
}

export default HeroSec