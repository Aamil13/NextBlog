import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, fetchPost } from '@/Redux/Slices/PostSlice';
import axios from 'axios';
import { toast } from 'react-toastify';


const NewPost = ({Open,close}) => {
  const dispatch = useDispatch()

  const [img,setImg]= React.useState("")
  // console.log(img?.type);
  const [inputs,setInputs]= React.useState({
    title:"",
    location:"",
    description:"",
    image:"",
    date: new Date().toLocaleDateString()
  })
  // console.log(inputs);
  const preset_key= "Blog_preset"
  const cloudName= "dgl8zmniq"

  const upp=()=>{
    // console.log("aaaaaaa");
    dispatch(fetchPost())
    setInputs({
      title:"",
      location:"",
      description:"",
      image:"",
      date: new Date().toLocaleDateString()
    })

    toast.success("Post Created!")
  }

  const handleChange=(e)=>{
    
    setInputs((prevstate)=>({
      ...prevstate,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    let type 
    if(img?.type === "image/png" || img?.type === "image/jpeg" ){
      // console.log("image");
      type = "image"
    }
    else if(img?.type === "video/mp4"){
      // console.log("video");
      type = "video"
    }
    const formdata= new FormData();
    formdata.append("file",img)
    formdata.append("upload_preset",preset_key)
   let res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`,formdata)
      // .then(res=> (setCloudImg(res.data.secure_url),console.log(res)))
      // .catch(err=> console.log(err))
// console.log('reee',res)

if(res?.data?.secure_url){
  inputs.image = res?.data?.secure_url
}
    if(!inputs.title || inputs.title.trim() === "" || 
    !inputs.description || inputs.description.trim() === ""||
    !inputs.location || inputs.location.trim() === "" ||
    !inputs.image || inputs.image.trim() === "" 
    ){
      return alert("All F")
    }

    
      let res2 = await dispatch(createPost(inputs))
      close()
      if(res2?.payload?.post?.title){
        upp()
      }
    
    
   
    // setTimeout(upp,3000)
  }


  return (
    <div >
    <Dialog
     id='dailogcss'
      open={Open}
      onClose={close}
      // fullWidth="true"
      maxWidth="sm"
      scroll='paper'
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <HighlightOffIcon  onClick={()=>close()} sx={{position:"absolute",top:"1%",right:"1%",zIndex:"10"}}/>
      <form onSubmit={handleSubmit}>
      {/* {img ? 
      <img style={{width:"100%",height:'240px',objectFit:"cover",borderRadius:"12px 12px 0px 0px"}} src="" alt="" />
        : <div style={{height:"240px",margin:"auto",marginTop:"10%"}}>
          <InsertPhotoIcon fontSize='large'/>
        </div>
    } */}
    <div style={{display:'flex',justifyContent:"center",alignItems:"center",height:"140px",width:"100%"}}>
    <input style={{display:"none"}} type="file" id='file' onChange={(e)=>setImg(e.target.files[0])} />
                <label htmlFor="file">
                  {img && img.type === "video/mp4" ?
                  <video style={{width:'500px', height:'140px', objectFit:'cover'}} src={URL.createObjectURL(img)} controls></video> :
                  img ?
                  <img src={URL.createObjectURL(img)} alt='' style={{width:'500px', height:'140px', objectFit:'cover'}}/>
                :
                <InsertPhotoIcon fontSize='large'/>
                }
              
                </label>
    </div>
    {/* <TextField onChange={handleChange} value={inputs.image} sx={{width:"50%",margin:"auto"}} name='image' label="Image"></TextField> */}
    <div style={{display:"flex",gap:"10px",padding:"5px"}}>
      <TextField onChange={handleChange} value={inputs.title} sx={{width:"50%",margin:"auto"}} name='title' label="Title"></TextField>
      <TextField onChange={handleChange} value={inputs.location} sx={{width:"50%",margin:"auto"}} name='location' label="Location"></TextField>
      </div>
      <DialogContent >
       <textarea onChange={handleChange} value={inputs.description} className='textarea' name='description' style={{fontFamily:"-moz-initial",fontSize:"20px",width:"100%",height:"300px",padding:"20px",resize:"none"}} placeholder='Express Your thoughts..' ></textarea>
        {/* <TextField sx={{width:"100%",height:"300px"}} ></TextField> */}
      </DialogContent>
      <Button c sx={{width:"100px",marginLeft:"40%",marginTop:"5px",marginBottom:"15px",zIndex:"10"}} type='submit' variant="contained" color="primary">Success</Button>
      </form>
    </Dialog>
  </div>
  )
}

export default NewPost