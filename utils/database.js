import mongoose from "mongoose";
let isConnected = false;

const connetToDB = async()=>{
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log('mongoDB is connected')
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        isConnected=true;
        console.log('mongoDB is connected');
    }catch(error){

    }
}
export default connetToDB;