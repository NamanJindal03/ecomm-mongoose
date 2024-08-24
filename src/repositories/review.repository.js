import reviewModel from "../models/review.model.js";
import productModel from "../models/product.model.js";
export default class ReviewRepository{
    async createReview(data){
        const {productId, userId, content, rating} = data;
        console.log(userId)
        const product = await productModel.findById(productId).lean()
        if(!product){
            throw new Error('invalid product id')
        }
        const review =  new reviewModel({product: productId, user: userId, content, rating});
        await review.save();
    }
}