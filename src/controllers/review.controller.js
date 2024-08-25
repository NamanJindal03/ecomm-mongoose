import mongoose from "mongoose";
import ReviewRepository from "../repositories/review.repository.js";
import ProductRepository from "../repositories/product.repository.js";

export default class ReviewController{
    constructor(){
        this.reviewRepository = new ReviewRepository();
        this.productRepository = new ProductRepository();
    }
    async addReview(req, res){
        try{
            const productId = req.query.productId;
            const userId = req.user.id;
            const body = req.body;
            body.userId = userId;
            body.productId = productId;
            const newReview = await this.reviewRepository.createReview(body);
            await this.productRepository.addReviewToProduct(productId, newReview._id)
            return res.status(200).json({status: true, message: 'review successfully added'})
        }
        catch(err){
            return res.status(400).json({status: 'false', message: 'failed to add the review', error: err.message })
        }
        
    }

    async updateReview(req, res){
        try{
            const reviewId = req.params.reviewId;
            const userId = req.user.id;
            const body = req.body
            body.reviewId = reviewId
            const reviewDocument = await this.reviewRepository.getReviewFromId(reviewId);
            if(!reviewDocument){
                return res.status(400).json({status: false, message: 'invalid review id', error: 'invalid review id' })
            }
            if(reviewDocument.user.toString() !== userId){
                return res.status(400).json({status: false, message: 'cannot update review', error: 'only can update review wriiten by yourself' })
            }
            const updatedReview = await this.reviewRepository.updateReview(body);
            return res.status(200).json({status: true, message: 'review updated successfully', data: updatedReview})

        }
        catch(err){
            return res.status(500).json({status: false, message: 'Something went wrong', error: 'Something went wrong' })

        }
        

    }

    async getReviews(req, res){
        try{
            const reviewId = req.params.reviewId;
            const reviewDocument = await this.reviewRepository.getReviewFromId(reviewId);
            if(!reviewDocument){
                return res.status(400).json({status: false, message: 'invalid review id', error: 'invalid review id' })
            }
            return res.status(200).json({status: true, data: reviewDocument})

        }
        catch(err){
            return res.status(500).json({status: false, message: 'Something went wrong', error: err })

        }
    }
}