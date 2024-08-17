import mongoose from "mongoose";

const url = "mongodb://localhost:27017/ecomm-mongoose"


// mongoose.connect(url, ()=> {
//     //executed in success
// }, 
// (err) => {
//     console.log(err)
// }
// )


// export const connectionToMongo = function(){
//     mongoose.connect(url)
//         .then((data)=>{
//             console.log(data);
//         })
//         .catch((err)=>{
//             console.log(err)
//             process.exit(1)

//         })
// }

let retry = 1;

export const connectionToMongo = async function(){
    try{
        return await mongoose.connect(url)
    }
    catch(err){
        if(retry) {
            console.log('some error occured');
            console.log('retrying........');
            retry--;
            return await connectionToMongo()
        }
        throw new Error(err)
    }
}

// import { MongoClient } from "mongodb"

// const url = "mongodb://localhost:27017/ecomm"

// let client;
// export const connectionToMongo = () => {
//     MongoClient.connect(url)
//         .then((currentclient)=> {
//             client = currentclient
//             console.log("connected succesfully to mongodb");
//             // console.dir(client);
//         })
//         .catch((err)=>{
//             console.log(err);
//             process.exit(1)
//         })
// }

// export const Db = ()=> {
//     return client.db();
// }