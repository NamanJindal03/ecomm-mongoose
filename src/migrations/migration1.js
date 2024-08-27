import categoryModel from "../models/category.model.js";
import { connectionToMongo } from "../db.js";

async function addCategories(){
    await connectionToMongo()
    const categories = await categoryModel.find();
    if(!categories || categories.length == 0){
        await categoryModel.insertMany([{name: 'Kitchen'}, {name: 'Electronics'}, {name: 'Student'}])
    }
    console.log('categories added')
}

addCategories().then(()=>{
    console.log('done')
})
.catch((err)=>{
    console.log(err)
})