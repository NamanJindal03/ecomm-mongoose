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
const preHook = (req, res, next) => {
    const originalJson = res.json.bind(res)
    res.json = function (body){
        res.locals.body = body;
        console.log(res.locals.body)
    }

    res.locals.originalJson = originalJson
    console.log('hookk')
    next()
}
const postHook = (req, res, next) => {
    console.log('entering')
    let body = res.locals.body
    body.me = 'm'
    return res.locals.originalJson(body)
}
const addProductHandler = (req, res, next) => {
    ProductController.addProduct(req, res, next)
}

router.route('/product')
    .post(preHook,addProductHandler, postHook)
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

router.route('/review/:reviewId')
    .put(auth, (...arg) => ReviewController.updateReview(...arg))
    .get(auth, (...arg) => ReviewController.getReviews(...arg))




export default router;