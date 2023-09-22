import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { SignUp } from '@/Redux/Slices/authSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 340,
  height:500,
  bgcolor: 'background.paper',
  border: '2px solid blue',
  boxShadow: 24,
  p: 4,
 
};

export default function Signup({handleClose,open}) {
  const [inputs,setInputs] =  React.useState({name:"",email:"",password:"",confirmpassword:""})
  const [emailerr,setEmailErr]= React.useState(false)
  const [name,setName]= React.useState(false)
  const [passerr,setPassErr]= React.useState(false)
  const [confrmpass,setConfirmPass]= React.useState(false)
  const [errmsg,setErrmsg]= React.useState("")

  const auth = useSelector((state)=> state.authStore)
  const dispatch = useDispatch()

  const handleChange=(e)=>{
    setEmailErr(false)
    setPassErr(false)
    setName(false)
    setConfirmPass(false)
      setInputs((prevstate)=>({
        ...prevstate,
        [e.target.name]: e.target.value
      }))
  }
 
  const handleSubmit=(e)=>{
    e.preventDefault()
    // console.log(inputs);

    if(!inputs.name || inputs.name.trim()==="" || !inputs.email || inputs.email.trim()==="" || !inputs.password || inputs.password.trim()===""|| !inputs.confirmpassword || inputs.confirmpassword.trim()===""){
      return (setEmailErr(true),setName(true),setConfirmPass(true), setPassErr(true),setErrmsg("All Feilds Required!"))
    }
    if(inputs.password.length < 6){
      return setPassErr(true),setErrmsg("Password Length Should Be Greater Than 5!")
    }
    if(inputs.password !== inputs.confirmpassword)
    {
      return setErrmsg("Password Do Not Match!"),setPassErr(true),setConfirmPass(true)
    }
    dispatch(SignUp(inputs))
    handleClose()
}

return (
<div>
 
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <div className='shape' style={{position:"absolute",top:"0px",left:"0%",width:"338px",height:"80px",backgroundColor:"#00B4D8",
    borderRadius:"0% 0% 50% 50%"}}></div>
    
        <form onSubmit={handleSubmit}>
    <Box
    display={"flex"}
    flexDirection={"column"}
    margin={"auto"}
    padding={1}
    gap={2.5}
  noValidate
  autoComplete="off"
>
    <Typography sx={{zIndex:2}} variant='h5' textAlign={"center"}>SIGN-UP</Typography>
  <TextField  error={name} onChange={handleChange} value={inputs.name} name='name'  type='name'  label="Name" variant="outlined" />
  <TextField error={emailerr} onChange={handleChange}   value={inputs.email} name='email' type='email'  label="Email" variant="outlined" />
  <TextField error={passerr} onChange={handleChange}  value={inputs.password} name='password' type='password'  label="Password" variant="outlined" />
  <TextField error={confrmpass} onChange={handleChange}  value={inputs.confirmpassword} name='confirmpassword' type='password'  label="Confirm Password" variant="outlined" />
  <Typography textAlign={"center"} maxHeight={10}>{errmsg}</Typography>
  <Button sx={{width:"100px",margin:"auto",marginTop:"17px"}} type='submit' variant="contained" color="primary">Submit</Button>
</Box>
</form>
    </Box>
  </Modal>
</div>
);
}