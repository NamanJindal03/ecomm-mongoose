import mongoose from 'mongoose'
const reviewSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 10,
        required: true
    },
    rating: {
        type: Number,
        max: 5,
        min: 1,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, {timestamps: true})

reviewSchema.index({user: 1, product: 1}, {unique: true})

export default mongoose.model("Review", reviewSchema);