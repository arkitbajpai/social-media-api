import Like from "../models/Like.js"

export const toggleLike = async(req,res)=>{

try{
    const {postId} = req.params;
    
    const post = await Post.findById(postId);

    if(!post)
    {
       return res.status(404).json({success:false,message:"post not found"});
    }

    const existingLike = await Like.findOne({
    user:req.user._id,
    post:postId
    });

    if(existingLike)
    {
        await existingLike.deleteOne();
         return res.status(404).json({success:false,message:"Post unliked"});

    }

 
 else{
    await Like.create({
    user:req.user._id,
    post:postId
    });
    return res.status(404).json({success:false,message:"Post liked"});



 }

}
catch(error){

return res.status(500).json({
success:false,
message:error.message
});

}

}