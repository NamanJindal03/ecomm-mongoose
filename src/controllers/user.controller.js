import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js"
import UserRepository from "../repositories/user.repository.js"
import { v4 as uuidv4 } from 'uuid';
const SECRET_CODE = 'iambatman' //supposed to go in env -> currently present here

const saltRounds = 10;

const roleEnums = ['customer', 'seller', 'logistics']

export default class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }
    async signup(req, res){
        try{
            const {name, email, password, role, address} = req.body;
            if(!name || !email || !password){
                return res.status(400).json({status: false, message: 'could not register user', error: 'required fiedls not presetn'})
            }
            // if(!roleEnums.includes(role)){
            //     return res.status(400).json({status: false, message: 'could not register user', error: 'role is not correct'})
            // }
            const hash = bcrypt.hashSync(password, saltRounds);
            // const userId = uuidv4();
            const newUser = new User({email, password: hash, name, role, address});
            // console.log(newUser);
            await this.userRepository.createUser(newUser);
            return res.status(201).json({status: true, message: 'user signed up succesfully'})
        }
        catch(err){
            return res.status(400).json({status: false, error:err, message: 'Trouble signing up'});
        }
        
    }
    
    async  signin(req, res){
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({status: false, message: 'could not signin user', error: 'required fiedls not presetn'})
        }
        const user = await this.userRepository.getUserByEmail(email);
        console.log(user)
        if(!user){
            return res.status(400).json({status: false, message: 'either password or email is incorrect', error: 'either password or email is incorrect'})
        }
        const isValidated = await bcrypt.compare(password, user.password);
        console.log(isValidated);
        if(!isValidated){
            return res.status(400).json({status: false, message: 'either password or email is incorrect', error: 'either password or email is incorrect'})
        }
        console.log(user._id);

        user.name = 'naman11111';
        await user.save();

        //do jwt token signing
        const token = await jwt.sign({id: user._id, email: user.email, role: user.role}, SECRET_CODE);
        
        //adding the token to the http only cookie
        const cookieOptions = {
            httpOnly: true
        }
        // if(process.env.NODE_ENV === 'PRODUCTION') cookieOptions.secure = true
        res.cookie('jwt', token)
    
        const userCopy = {...user, token}
        return res.status(200).json({status: true, data: 'login success', user: userCopy});
    }
    
    async allUsers(req, res){
        const users = await this.userRepository.getUsers();
        return res.status(200).json({data: users});
    }
    
    async updateUser(req, res){
        const id = req.params.userId
        const {body} = req;
        body.password = bcrypt.hashSync(body.password, saltRounds);
        const updatedUser  = await User.findOneAndUpdate({_id: id}, body, {new: true});
        console.log(updatedUser)
        return res.status(200).json({data: updatedUser});
        

    }
}

// export {signup, signin, allUsers}