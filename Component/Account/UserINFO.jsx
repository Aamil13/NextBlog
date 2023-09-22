import { Avatar } from '@mui/material'
import React from 'react'

const UserINFO = ({name,email,left}) => {
  // console.log(left);
  return (
    <div className='userInfo' style={{height:"90.4vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",
    padding:"20px",gap:"40px",backgroundColor:"grey",left:`${left}`}}>
        <Avatar sx={{width:100,height:100}}>H</Avatar>
        <div>
            <p style={{fontWeight:"700",textAlign:"center"}}>{name}</p>
            <p style={{fontWeight:"700"}}>{email}</p>
        </div>
    </div>
  )
}

export default UserINFO