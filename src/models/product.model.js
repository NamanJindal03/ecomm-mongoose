import mongoose from 'mongoose'
const productSchema = new mongoose.Schema({
    name: String,
    price: {
        type: Number,
        min: 10,
    },
    rating: Number,
    decription: String,
    quantity: {
        type: Number,
        validate: { //custom validations
            validator: value => value>=0,
            message: 'quantity cannot be less than 0'
        },
        default: 0,
        required: true
    },
    userRatingCount: Number,
    userRatingMapping: {
        type: [Object]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    review: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Review',
        default: []
    }
        
}, {timestamps: true})

export default mongoose.model("Product", productSchema);


// export default class Product{
//     constructor(name, price, rating, description, quantity, creatorId, userRatingCount, userRatingMapping){
//         this.name = name;
//         this.price = price;
//         this.rating = rating;
//         this.description = description;
//         this.quantity = quantity;
//         this.creatorId = creatorId;
//         this.userRatingCount = userRatingCount;
//         this.userRatingMapping = userRatingMapping;
//     }
    
    
//     static getProductFromId(productId){
//         const product = products.find((entry)=>{
//             return entry.id == productId
//         })
//         return product;
//     }
//     static addProductRating(productId, userId, rating){
//         const selectedProduct = Product.getProductFromId(productId);
//         const existingRating = selectedProduct.userRatingMapping[userId];
//         //no rating means that user has not rated before
//         if(!existingRating){
//             selectedProduct.rating = (selectedProduct.rating*selectedProduct.userRatingCount + rating)/selectedProduct.userRatingCount;
//             selectedProduct.userRatingCount++;
//         }
//         else{
//             selectedProduct.rating = (selectedProduct.rating*selectedProduct.userRatingCount - existingRating + rating)/selectedProduct.userRatingCount;
//         }

//         selectedProduct.userRatingMapping[userId] = rating;
//     }
// }
// let products = [
//     new Product("1", 'showpiece', 5, 0, 'beautiful', 10, 123145, 0, {}),
//     new Product("2", 'showpiece', 200, 0, 'beautiful', 10, 123145, 0, {}),
//     new Product("3",'showpiece', 60, 0, 'beautiful', 10, 123145, 0, {}),
//     new Product("4", 'showpiece', 70, 0, 'beautiful', 10, 123145, 0, {}),
// ]
/* 
    {'userId': }
*/