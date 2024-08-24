import express from 'express';
// import {getAllProducts, getProduct, addProduct, rateProduct} from '../controllers/product.controller.js'
import UserControllerClass from '../controllers/user.controller.js';
import ProductControllerClass from '../controllers/product.controller.js';
import ReviewControllerClass from '../controllers/review.controller.js';
import { placeOrder } from '../controllers/order.controller.js';

import { auth, customerCheck } from '../middlewares/auth.js';
import { User } from '../models/user.model.js';

const router =  express.Router()

const UserController = new UserControllerClass();
const ProductController = new ProductControllerClass();
const ReviewController = new ReviewControllerClass();

router.route('/product')
    .post((...arg)=> ProductController.addProduct(...arg))
    .get(auth, (...arg)=> ProductController.getAllProducts(...arg))

router.route('/product/:productId')
    .get((...arg)=> ProductController.getProduct(...arg))

router.route('/product/:productId/rate')
    .post(auth,(...arg)=> ProductController.rateProduct(...arg))

router.route('/user/signup')
    .post((...arg) => UserController.signup(...arg))

router.route('/user/signin')
    .get((...arg) => UserController.signin(...arg))

router.route('/user')
    .get((...arg)=>UserController.allUsers(...arg))

router.route('/user/:userId')
    .put((...arg) => UserController.updateUser(...arg))

router.route('/order/:productId')
    .post(customerCheck, placeOrder)

router.route('/review')
    .post(auth, (...arg) => ReviewController.addReview(...arg) )
    .get(auth, (...arg) => ReviewController.getReviews(...arg))

router.route('/review/:reviewId')
    .put(auth, (...arg) => ReviewController.updateReviews(...arg))



export default router;