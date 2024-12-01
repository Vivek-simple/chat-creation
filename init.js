const mongoose=require('mongoose');
const Chat=require('./modal/chat');
main()
.then(res=>console.log("connection establish"))
.catch(err=>console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  };

  let user=[
    {
        from:"raj",
        msg:"give me some ruppes",
        to:"vinod",
        created_at:new Date()
    },
    {
        from:"aditya",
        msg:"focus on your goal",
        to:"aman",
        created_at:new Date()
    },
    {
        from:"vivek",
        msg:"hii janu love you",
        to:"xyz",
        created_at:new Date()
    },
    {
        from:"ravi",
        msg:"how this question solve",
        to:"amit",
        created_at:new Date()
    }
  ];

  Chat.insertMany(user)
  .find(res=>console.log(res))
  .catch(err=>console.log(err));