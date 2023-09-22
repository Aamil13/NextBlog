"use client"
import SpacingGrid from '@/Component/GridSpace'
import HeroSec from '@/Component/HeroSec'
import Paginate from '@/Component/Paginate'
import { fetchPost } from '@/Redux/Slices/PostSlice'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'


export default function Home() {

  /**
   * handleOnUpload
   */




  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchPost())
  },[])
  return (
    <>
    <HeroSec/>
    <SpacingGrid/>
    <Paginate/>
    </>
  )
}
