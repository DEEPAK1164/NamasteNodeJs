const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4
    },
    lastName:{
        type:String

    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true  //avoid spaces before in and after while entering email
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){//note validate fn will only work if insert new object not input or patch so use run validators:true in this cases
            if(!["male","female","others"].includes(value))
            {
                throw new Error("Gender is not valid data")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://geographyandyou.com/images/user-profile.png"
    },
    about:{
       type:String,
       default:"This is a default about of the user!" //it automatically get inserted by default
    },
    skills:{
        type:[String]  //array of skills
    }
},
{
    timestamps:true,//it tells when user registered
}
);


const User=mongoose.model("User",userSchema);


module.exports=User;
