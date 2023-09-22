import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const OpenPost = ({Open,close,data}) => {
  return (
    <div>
      <Dialog
     
       id='dailogcss'
        open={Open}
        onClose={close}
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <HighlightOffIcon  onClick={()=>close()} sx={{position:"absolute",top:"1%",right:"1%"}}/>
        <img style={{width:"100%",height:'240px',objectFit:"cover",borderRadius:"14px 14px 0px 0px"}} src={data.image} alt="" />
        <DialogTitle id="scroll-dialog-title">{data.title}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            
            tabIndex={-1}
          >
            {data.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </DialogActions>
      </Dialog>
    </div>
  )
}

export default OpenPost