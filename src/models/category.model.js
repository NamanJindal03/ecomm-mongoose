import mongoose from 'mongoose'
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    description: {
        type: String,
        min: 5,
        max: 25,
    },
    product: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
        default: []
    }
}, {timestamps: true})

export default mongoose.model("Category", categorySchema);