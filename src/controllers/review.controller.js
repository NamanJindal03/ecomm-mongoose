import mongoose from "mongoose";
import ReviewRepository from "../repositories/review.repository.js";

export default class ReviewController{
    constructor(){
        this.reviewRepository = new ReviewRepository()
    }
    async addReview(req, res){
        try{
            const productId = req.query.productId;
            const userId = req.user.id;
            const body = req.body;
            body.userId = userId;
            body.productId = productId;
            await this.reviewRepository.createReview(body)
            return res.status(200).json({status: true, message: 'review successfully added'})
        }
        catch(err){
            return res.status(400).json({status: 'false', message: 'failed to add the review', error: err.message })
        }
        
    }

    updateReview(){

    }

    getReviews(){

    }
}