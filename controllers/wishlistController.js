//import wishlist collection
const wishlists=require('../models/wishlistSchema')

//add to wishlist logic
exports.addtowishlist=async(req,res)=>{
    //get product deatils from request

    //using destructuring
    const {id,title,price,image}=req.body

    //logic
    try{
        //checkif the product in the mongodb
        const item=await wishlists.findOne({id})
        if(item){
            res.status(403).json("item already exists in wishlist")
        }
        else{
            //add the item tothe wishlist
            const newProduct=new wishlists({id,title,price,image})
            //to store in the mongodb
            await newProduct.save()
            res.status(200).json("product added to the wishlist")

        }
    }
    catch(error){
        res.status(401).json(error)

    }
}

//get wishlist data -logic
exports.getWishlistitems=async(req,res)=>{
    //logic
    try{
        //get all wishlist item from the mongodb
        const allWishlistItem=await wishlists.find()
        res.status(200).json(allWishlistItem)

    }
    catch(error){
        res.status(401).json(error)

    }
}

//remove wishlist item -logic
exports.removewishlistitems=async(req,res)=>{
    //get id from the request
    const {id}=req.params
    try{
        const removewishlistitem=await wishlists.deleteOne({id})
        if(removewishlistitem){
            //get all wishlists item after removing perticular  wishlist item
            const allwishlists =await wishlists.find()//remaining wishlist item
            res.status(200).json(allwishlists)

        }
        else{
            res.status(404).json('product not found in wishlist')
  
        }
    }
    catch(error){
        res.status(401).json(error)

    }
}