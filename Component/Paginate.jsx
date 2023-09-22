import React from 'react'
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '@/Redux/Slices/PostSlice';

const Paginate = () => {
  
    const dispatch = useDispatch()
    const articles =  useSelector((state)=> state.postStore)

    const applyPagination = async(val)=>{
        // dispatch(clear())
        dispatch(fetchPost(val))
    }
  return (
    <div style={{display:'flex', justifyContent:'center',padding:"10px"}}>
    <Pagination count={Math.ceil(articles?.count/10) || 1} color="primary" onChange={(e)=>applyPagination(e.target.textContent)}/>
    </div>
  )

}

export default Paginate