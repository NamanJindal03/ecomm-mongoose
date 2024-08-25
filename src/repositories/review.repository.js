import reviewModel from "../models/review.model.js";
export default class ReviewRepository{
    async createReview(data){
        const {productId, userId, content, rating} = data;
        const review =  new reviewModel({product: productId, user: userId, content, rating});
        return await review.save();
    }

    async getReviewFromId(id){
        return await reviewModel.findById(id)
    }

    async updateReview(data){
        const {reviewId, content, rating} = data;
        return await reviewModel.findByIdAndUpdate(reviewId, {content, rating}, {new: true})

    }
}