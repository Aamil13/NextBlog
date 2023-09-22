import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import {useRouter} from "next/navigation"

import LongMenu from './MenuDot';
import { useSelector } from 'react-redux';
import OpenPost from './OpenPost';


export default function RecipeReviewCard({data}) {
  const [handleopen, sethandleOpen] = React.useState(false);
// console.log(data);
  const navigate = useRouter()
  const userlog = useSelector((state)=> state.authStore)

  const isLoggedInUser = ()=>{
    if(userlog?.isLoggedIn && localStorage.getItem("userID") === data.user._id){
      return true
    }

    return false
  }
  const handleOpen = () => sethandleOpen(true);
  const handleClose = () => sethandleOpen(false)
  

  
  return (
    <div >
    <Card  sx={{ width: 325,borderRadius:4,height:350,marginBottom:4 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {data?.user?.name?.charAt(0)}
          </Avatar>
        }
        action={
          isLoggedInUser() && <LongMenu id={data._id}/>
        }
        title={data.title}
        subheader={new Date(data.date).toLocaleDateString()}
      />
      <CardMedia
      onClick={()=>navigate.push(`/post/${data._id}`)}
      
        component={`${data.image.endsWith(".mp4") ? "video" : "image"}`}
        sx={{height:"100px"}}
        image={data.image}
        alt="image"
        controls
      />
      <CardContent onClick={()=>navigate.push(`/post/${data._id}`)} >
        <Typography sx={{height:100}} variant="body2" color="text.secondary">
          {`${data?.description?.substr(0,200)}...`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
     
    </Card>
    <OpenPost data={data} Open={handleopen} close={handleClose} />
    </div>
  );
}
