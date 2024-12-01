const mongoose=require('mongoose');
const userSchema=new mongoose.Schema(
    {
        from:{
            type:String,
            required:true
        },
        msg:{
            type:String,
            
        },
        to:{
            type:String,
            required:true
        },
        created_at:{
            type:Date
        }
    }
);

const Chat=mongoose.model('Chat',userSchema);
module.exports=Chat;