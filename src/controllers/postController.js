import Post from "../models/Post";

export const CreatePost=async(req,res)=>{
    const {caption,image}=req.body;
    
    try{
        const post = await Post.create({
            caption, image,
            user:req.user._id
        })
        
        if(!post)
            console.log("error in creating post");
        return res.status(201).json({
                success:true,
                message:"Post created",
                post})
          }catch(error){
             return res.status(404).json({message:error})
           }


}


export const getAllPosts = async(req,res)=>{
    
try{
    const posts = await Post.find().populate("user", "name email").sort({createdAt:-1});
    return res.status(200).json({

                success:true,
                count:posts.length,
                posts

            })

    

     }catch(error){
    return res.status(500).json({success:false,message:error.message})



}}
export const updatePost=async(req,res)=>{

try{

const post=
await Post.findById(
req.params.id
);


if(!post){

return res.status(404).json({
success:false,
message:"Post not found"
})

}


if(
post.user.toString()
!==req.user._id.toString()
){

return res.status(403).json({

success:false,
message:"Unauthorized"

})

}


post.caption=
req.body.caption
|| post.caption;


post.image=
req.body.image
|| post.image;


await post.save();


return res.status(200).json({

success:true,
message:"Post updated",
post

})

}
catch(error){

return res.status(500).json({

success:false,
message:error.message

})

}

};jsut
