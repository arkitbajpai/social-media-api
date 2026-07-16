import Comment from "../models/Comment.js";

export const addComment = async(req,res)=>{

try{
    const {content}= req.body;
    const {postId}= req.params;

    
       const checkthepost= await Post.findById(postId);
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

export const getCommentsByPost= async(req,res)=>{
    try{
        const {postId}= req.params;
        const postid= await Post.findById(postId);

        if(!postid)
            return res.status(404).message("post not found");

        const comments = await Comment.find({post: postId}).populate("user","name email").sort({ createdAt:-1});
        return res.status(200).json({
   success:true,
   count: comments.length,
   comments})

    }
    catch(error){
        return res.status(404).message(error)
    }
} 


  export const updateComment = async(req,res)=>{

   try{

        const { commentId } = req.params;

        const { content } = req.body;

        const comment = await Comment.findById(commentId);

     if(!comment){
        return res.status(404).json({success:false,message:"Comment not found sorry!"});
       }


     if(comment.user.toString()!== req.user._id.toString()){
       return res.status(403).json({success:false,message:"Unauthorized sorry!"});
     }
     comment.content =content || comment.content;

      await comment.save();
      return res.status(200).json({success:true,message:"Comment updated successfully",comment});

}
catch(error){

return res.status(500).json({success:false,message:error.message});

}

};



export const deleteComment = async(req,res)=>{

try{

const { commentId } = req.params;

const comment = await Comment.findById(commentId);
if(!comment){
return res.status(404).json({
success:false,message:"Comment not found"});}

const post = await Post.findById(comment.post);

const isCommentOwner =comment.user.toString()=== req.user._id.toString();


const isPostOwner =post.user.toString()=== req.user._id.toString();


if(!isCommentOwner &&!isPostOwner){

return res.status(403).json({
success:false,message:"Unauthorized"
});

}


await comment.deleteOne();

return res.status(200).json({
success:true,message:"Comment deleted successfully"
});

}
catch(error){

return res.status(500).json({
success:false,message:error.message
});

}

};