
import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
    address1: {
        type: String,
        minLength: 6,
        required: true,
    },
    address2: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        // length: 6, check this out later 
        required: true
    },
    state: {
        type: String,
        required: true
    }
})

const userSchema = new mongoose.Schema({
    // name: String,
    // email: String,
    // password: String,
    // role: String
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        immutable: true,
        match: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['CUSTOMER', 'SELLER', 'LOGISTICS']
    },
    achievement:{
        type: String, 
        default: ''
    },
    isWorking: {
        type: Boolean,
        default: false
    },
    // address: {
    //     type: addressSchema,
    //     required: true
    // }
})


/* 
    model methods
    virtuals
    hooks
*/

//very important -> always use normal function with all the above functionalities
userSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`
})

userSchema.pre('save', function(next){
    this.lastName = 'random random';
    //logging -> 
    // this.fullName = 
    next();
})

userSchema.post('save', function(data, next){
    console.log('post hook called')
    console.log(data);
    next();
})


export const User =  mongoose.model('User', userSchema);




// import { Db } from "../db.js";
// export default class User{
//     constructor(email, password, name, role){
//         // this.id = userId
//         this.name = name;
//         this.email = email;
//         this.password = password;
//         this.role = role;
//     }
    
//     // static async getUserByEmail(email){
//     //     const userCollection= Db().collection("user")
//     //     const user = await userCollection.findOne({email: email});
//     //     // const user = users.find((entry)=>{
//     //     //     return entry.email == email
//     //     // })
//     //     return user;
//     // }
    
//     async getUserById(id){
//         const userCollection= Db().collection("user")
//         const user = await userCollection.findOne({_id: id});
//         // const user = users.find((entry)=>{
//         //     return entry.id == id
//         // })
//         return user;
//     }

//     //TODO: only for dev - remove before pushing
    
// }
// let users = [
// ]