
// import { Db } from "../db.js";

import {User} from '../models/user.model.js'

export default class UserRepository{
    async getUserByEmail(email){
        // const userCollection= Db().collection("user")//
        const user = await User.findOne({email: email});

        /* 
            const user = await User.findOne({email: email}).lean();
        */

        // const user = users.find((entry)=>{
        //     return entry.email == email
        // })
        return user;
    }
    async createUser(newUser){
        // const userCollection= Db().collection("user")
        
        return await newUser.save()
        // users.push(user);
    }

    

    async getUsers(){
        // const userCollection= Db().collection("user")
        const something = await User.find({});
        return something
    }
}