import mongoose from "mongoose";

const Schema=mongoose.Schema;

const bookSchema= new Schema({
    title:{
       type: String,
       required:true,
    },
        
    author:{
     type:String,
     required:true,
    },

    genre:{
        type:String,
    },

    description:{
        type:String,
    },

    ownerId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    updateAt:{
        type:Date,
    },

},
{timestamps:true}
)


const bookModel=new mongoose.model("Book",bookSchema);

export default bookModel;