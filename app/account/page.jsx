"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  { UserInfoCall } from '@/Redux/Slices/authSlice'
import UserINFO from '@/Component/Account/UserINFO'
import Rightside from '@/Component/Account/Rightside'
import CloseIcon from '@mui/icons-material/Close';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';


const Account = () => {

    const userauth = useSelector((state)=> state.authStore)
    const [left,setLeft]= useState("-90")
    const [expanded,setExpanded] = useState(false)

    const dispatch = useDispatch()

        const call = async()=>{
            const id = localStorage.getItem("userID")
            const res = await dispatch(UserInfoCall(id))
            return res;
        }
    useEffect(()=>{
        call()
    //    if(res2){
    //     dispatch(UserInfo(res2))
    //    }
    },[])

    const closeside=()=>{
        setLeft("-90%")
        setExpanded(false)
    }
    const openside=()=>{
        setLeft("0")
        setExpanded(true)
    }
  return (
    <>
    {
        expanded ? <CloseIcon onClick={()=> closeside()} className='closeicon'/>
        :
        <DensityMediumIcon className='openicon' onClick={()=>openside()} />
    }
    
    
    <div className='userinfo'>
    {/* <CloseIcon onClick={()=>setLeft("-90")} className='closeicon'/> */}
        <UserINFO left={left} name={userauth?.info?.user?.name} email={userauth?.info?.user?.email}/>
        <Rightside post={userauth?.info?.user?.post}/>
    </div>
    </>
  )
}

export default Account