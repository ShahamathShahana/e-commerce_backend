// to define routes for client request - create routes folder and router.js files

        // import express
        const express=require('express')

        //import productController
        const productController=require('../controllers/productController')

        //import wishlistController
        const wishlistsController = require('../controllers/wishlistController')

       //import cartController
        const cartController=require('../controllers/cartController')

        //using express create an object for router class inordered to setup path
        const router=new express.Router()

        //resolving client requests
            //api- getallproducts request
            router.get('/products/all-products',productController.getallproducts)

            //api - get particular product
            router.get('/products/view-product/:id',productController.viewProduct)

            //api - product added wishlist product
            router.post('/wishlist/add-to-wishlist',wishlistsController.addtowishlist)

            //api - get wishlist product
            router.get('/wishlist/get-wishlist',wishlistsController.getWishlistitems)

            //api - remove wishlist item
            router.delete('/wishlist/remove-wishlist-item/:id',wishlistsController.removewishlistitems)

            //api - add to cart
            router.post('/cart/add-to-cart',cartController.addtocart)

            //api - get cart product
            router.get('/cart/get-cart',cartController.getcartitems)

            //api - remove item from cart
            router.delete('/cart/remove-item/:id',cartController.removecartitem)

            //api - increment quantity
            router.get('/cart/increment/:id',cartController.incrementcount)

            //api - decrement quantity
            router.get('/cart/decrement/:id',cartController.decrementcount)


            //export router
            module.exports=router