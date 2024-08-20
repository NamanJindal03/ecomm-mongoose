
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
    name: {
        type: String
    },
    email: {
        type: String,
        immutable: true,
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