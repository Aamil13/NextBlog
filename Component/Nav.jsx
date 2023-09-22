"use client"
import React, { useState } from 'react'
import { AppBar, Avatar, Box, Menu, Tab, Tabs, Toolbar,Tooltip,IconButton,MenuItem, Typography, Skeleton } from '@mui/material'
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@/Redux/Slices/authSlice';
import {useRouter} from "next/navigation"

const settings = ["LOG-IN","SIGN-UP"]
const settings2 = ["ACCOUNT","LOG-OUT"]
const Nav = () => {
  const navigate = useRouter()

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector((state)=> state.authStore)
    // console.log(auth?.isLoggedIn);

    //login modal
    const [logopen, setLogOpen] = React.useState(false);
    const loghandleOpen = () => setLogOpen(true);
    const loghandleClose = () => setLogOpen(false);

    //sign-up
    const [signopen, setsignOpen] = React.useState(false);
    const signhandleOpen = () => setsignOpen(true);
    const signhandleClose = () => setsignOpen(false);

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = (e) => {
      const innertext = (e.target.innerText);

      if(innertext === "LOG-IN"){
         loghandleOpen()
      }
      if(innertext === "SIGN-UP"){
         signhandleOpen()
      }
      if(innertext === "ACCOUNT"){
         // console.log("aa");
         navigate.push('/account')

      }
      if(innertext === "LOG-OUT"){
        dispatch(logOut())
        navigate.push("/")
      }
      setAnchorElUser(null);
    };
  
  return (
   <AppBar sx={{position:'sticky',}}>
    <Toolbar>
      
        <RssFeedRoundedIcon style={{zIndex:"10"}} onClick={()=>navigate.push("/")} />

        <Box sx={{ flexGrow: 0,ml:"auto" }}>
            <Tooltip  title="Options">
              {
                auth?.isLoading ?
                <Skeleton sx={{ bgcolor: 'grey.700' }} variant="circular"  width={40} height={40} />
              :
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar {...stringAvatar(auth?.user?.info?.name)} /> */}
                <Avatar>
                  {auth?.info?.user?.name.charAt(0)}
                </Avatar>
              </IconButton>
}
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >{
              auth?.isLoggedIn ?  settings2.map((item,idx)=>(
                <MenuItem  key={idx} onClick={(e)=>handleCloseUserMenu(e)} >
                  <Typography textAlign="center">{item}</Typography>
                </MenuItem>
              ))
            :
          
              settings.map((item,idx)=>(
                <MenuItem  key={idx} onClick={(e)=>handleCloseUserMenu(e)} >
                  <Typography textAlign="center">{item}</Typography>
                </MenuItem>
              ))
            

            }
              
            </Menu>
          </Box>
    </Toolbar>
    <Login open={logopen} handleClose={loghandleClose} />
    <Signup open={signopen} handleClose={signhandleClose} />
   </AppBar>
   
   
  )
}

export default Nav