import * as React from 'react';
import Grid from '@mui/material/Grid';
import RecipeReviewCard from '@/Component/BlogCards'
import { useSelector,useDispatch } from 'react-redux';
import { createPost, fetchPost } from '@/Redux/Slices/PostSlice';
import { Box, Skeleton } from '@mui/material';



export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(4);
      const dispatch = useDispatch()
    const Allpost = useSelector((state)=> state.postStore)

   React.useEffect(()=>{
      dispatch(fetchPost())
   },[])




  return (
    <Grid sx={{ flexGrow: 1, }} container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container justifyContent="center"  spacing={spacing}>
          {Allpost?.isLoading ?
           <Box sx={{display:'flex',flexWrap:"wrap",justifyContent:"center" , gap:"20px"}}>
           <div style={{minWidth:"300px"}}>
           <Skeleton height={250} width={300} />
           <Skeleton  />
           <Skeleton  />
           </div>
           <div style={{minWidth:"300px"}}>
           <Skeleton height={250} width={300} />
           <Skeleton  />
           <Skeleton  />
           </div>
           <div style={{minWidth:"300px"}}>
           <Skeleton height={250} width={300} />
           <Skeleton  />
           <Skeleton  />
           </div>
         </Box>
          :
          Allpost?.data?.map((value,idx) => (
            
            <Grid key={idx} item>
              <RecipeReviewCard data={value}/>
              {/* <BlogCards2/> */}
            </Grid>
          ))}
        </Grid>
      </Grid>    
    </Grid>

 
  );
}
