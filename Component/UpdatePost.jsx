import { Button, Dialog, DialogContent, TextField } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { EditPost, fetchPost } from '@/Redux/Slices/PostSlice';

const UpdatePost = ({data,Open,close,id}) => {
   
    const [inputs,setInputs]= React.useState({
        title:"",
        location:"",
        description:"",
        image:""
      })

      const dispatch = useDispatch()

      useEffect(()=>{
        
        setInputs({
            title:data?.title,
        location:data?.location,
        description:data?.description,
        image:data?.image,
        })
      },[data])
    
    // console.log(inputs?.image.endsWith(".mp4"));
    
      const handleChange=(e)=>{
        
        setInputs((prevstate)=>({
          ...prevstate,
          [e.target.name]: e.target.value
        }))
      }
    
      const handleSubmit=async(e)=>{
        e.preventDefault()
    
        if(!inputs.title || inputs.title.trim() === "" || 
        !inputs.description || inputs.description.trim() === ""||
        !inputs.location || inputs.location.trim() === ""
        ){
          return alert("All F")
        }
    
        // dispatch(createPost(inputs))
        // setTimeout(upp,3000)
        // console.log('ididid',id);
        inputs.id = id;
       let res = await dispatch(EditPost(inputs,id))
       close()
       if(res?.payload?.message){
        dispatch(fetchPost())
       }
      }


  return (
    <div >
    <Dialog
     id='dailogcss'
      open={Open}
      onClose={close}
      maxWidth="sm"
      scroll='paper'
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <HighlightOffIcon  onClick={()=>close()} sx={{position:"absolute",top:"1%",right:"1%",zIndex:"10"}}/>
      <form onSubmit={handleSubmit}>
    
    
    {/* <TextField onChange={handleChange} value={inputs.image} sx={{width:"50%",margin:"auto"}} name='image' label="Image"></TextField> */}
    {/* <img src={inputs.image} alt='' style={{width:'500px', height:'140px', objectFit:'cover'}}/> */}
    {inputs?.image?.endsWith(".mp4") ?
                  <video style={{height:"140px",width:'500px'}} src={(inputs.image)} controls></video> :
                  
                  <img src={(inputs.image)} alt='' style={{width:'500px', height:'140px', objectFit:'cover'}}/>
              
                }
    <div style={{display:"flex",gap:"10px",padding:"5px"}}>
      <TextField onChange={handleChange} value={inputs.title} sx={{width:"50%",margin:"auto"}} name='title' label="Title"></TextField>
      <TextField onChange={handleChange} value={inputs.location} sx={{width:"50%",margin:"auto"}} name='location' label="Location"></TextField>
      </div>
      <DialogContent dividers={scroll === 'paper'}>
       <textarea onChange={handleChange} value={inputs.description} className='textarea' name='description' style={{fontFamily:"-moz-initial",fontSize:"20px",width:"100%",height:"300px",padding:"20px",resize:"none"}} placeholder='Express Your thoughts..' ></textarea>
      </DialogContent>
      <Button sx={{width:"100px",marginLeft:"40%",marginTop:"5px",marginBottom:"15px"}} type='submit' variant="contained" color="primary">Success</Button>
      </form>
    </Dialog>
  </div>
  )
}

export default UpdatePost