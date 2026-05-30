import Post from "../models/Post";

export const addComment = async(req,res)=>{

try{
    const content= req.body;
    const postId= req.params;

    
       const checkthepost=  await Post.find(postId);
       if(!checkthepost)
          return res.status(404).message("post not found");
    
    await Comment.create({content,user:req.user._id,post:postId});
    
    return res.status(202).message("postcreated");



}
catch(error){

return res.status(500).json({
success:false,
message:error.message
})

}

}