
import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
})

export default mongoose.model("User", userSchema);





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