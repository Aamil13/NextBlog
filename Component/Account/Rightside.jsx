import React from 'react'
import BlogCards from "../BlogCards"

const Rightside = ({post}) => {
    // console.log(post);
  return (
    <div >
        <div style={{display:"flex", justifyContent:"space-evenly",padding:"3rem"}}>
            <div className='dis'>Total Post:{post?.length}</div>
            {/* <div  className='dis'>Liked Post</div> */}
        </div>

        <div style={{width:"100%"}}>
            {
                 post?.length >=1 ? 
                 <div style={{display:"flex",overflow:"scroll",gap:10}}>
                 {post.map((item,key)=>(
                    <BlogCards key={key} data={item}/> 
                 ))}
                 </div>
                 : <p>no</p>
            }
            
        </div>
    </div>
  )
}

export default Rightside