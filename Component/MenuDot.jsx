import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { SinglePost, deletePost, fetchPost } from '@/Redux/Slices/PostSlice';
import UpdatePost from './UpdatePost';

const options = [
  'EDIT',
  'DELETE'
  
];

const ITEM_HEIGHT = 48;

export default function LongMenu({id}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [postdata, setPostData] = React.useState("")
  const [upopen,setUpOpen] = React.useState(false)
  const handleOpen=()=> setUpOpen(true)
  const handleclose=()=> setUpOpen(false)

  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async(e) => {
    // console.log(,id);
    if(e.target.innerText === "EDIT"){
      const singlepost = await dispatch(SinglePost(id))
      // console.log(singlepost.payload.post);
      setPostData(singlepost?.payload?.post)
      handleOpen()
    }
    else if(e.target.innerText === "DELETE"){
     let res = await dispatch(deletePost(id))
    //  console.log(res);
     if(res?.payload){
      dispatch(fetchPost())
     }
    
    }
   
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={(e)=>handleClose(e)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      <UpdatePost data={postdata} Open={upopen} close={handleclose} id={id} />
    </div>
  );
}