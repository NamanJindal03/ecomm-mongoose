
// import { Db } from "../db.js";
import Product from '../models/product.model.js'

export default class ProductRepository{
    async addProduct(product){
        // const productCollection= Db().collection("product")
        await Product.insertOne(product)
        // products.push(newProduct);
    }
    async getAllProducts(filters){
        // if(!(filters.minPrice && filters.maxPrice)){
        //     return products;
        // }
        // const productCollection= Db().collection("product")
        const filter = {}
        // if(filters.minPrice){
        //     filter.price = {$gte: parseInt(filters.minPrice)}
        // }
        // if(filters.maxPrice){
        //     filter.price = {$lte: parseInt(filters.maxPrice)}
        // }
        // //eradicate this
        // if(filters.maxPrice && filters.minPrice){
        //     filter.price = {$lte: parseInt(filters.maxPrice), $gte: parseInt(filters.minPrice)}
        // }

        //?
        if(filters.minPrice){
            filter.price = filter.price || {}
            filter.price.$gte = parseInt(filters.minPrice)
        }
        if(filters.maxPrice){
            filter.price = filter.price || {}
            filter.price.$lte = parseInt(filters.maxPrice)
        }
        if(filters.price){
            filters.price = filters.price.split(',');
            filters.price = filters.price.map((entry)=>{
                return parseInt(entry)
            })
            console.log(filters.price);
            filter.price = {$in: filters.price}
            filter.quantity = {$gt: 10}
        }
        return await Product.find(filter).toArray()
        // const filterteredProducts = products.filter((entry)=>{
        //     return (
        //         (
        //         (!filters.minPrice || entry.price > parseInt(filters.minPrice)) && 
        //         (!filters.maxPrice || entry.price < parseInt(filters.maxPrice))   
        //         )
        //     )
        // })
        // return filterteredProducts;
    }
}