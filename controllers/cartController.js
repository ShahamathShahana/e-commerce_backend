//import cart collection
const carts=require('../models/cartSchema')

//add to cart
exports.addtocart=async(req,res)=>{
    //getproduct details from request
    const {id,title,price,image,quantity}=req.body

    //logic
    try{
        //check if product is already in cart
        const product=await carts.findOne({id})
        if(product){
            //product is in cart,increment product quantity
            product.quantity+=1
            //product grand total in mongodb
            product.grandTotal=product.price*product.quantity
            //to save changes in mongodb
            product.save()
            //send response to the client
            res.status(200).json('product added to the cart successfully')
        }
        else{
            //product is unavailable in the cart
            //add product to the cart
            const newProduct=new carts({id,title,price,image,quantity,grandTotal:price})
            //save new product
            await newProduct.save()
            //send response to theclient
            res.status(200).json('product added to the cart ')
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

//get cart data -logic
exports.getcartitems=async(req,res)=>{
    //logic
    try{
        //get all wishlist item from the mongodb
        const allcartProduct=await carts.find()
        res.status(200).json(allcartProduct)

    }
    catch(error){
        res.status(401).json(error)

    }
}

//remove a product from cart
exports.removecartitem=async(req,res)=>{
  //get product id from request params
const {id}=req.params  
    try{
//remove an item from cart
const removeProduct=await carts.deleteOne({id})
if(removeProduct.deletedCount!=0){
    //get remainingproduct
    const remainingproducts=await carts.find()
    res.status(200).json(remainingproducts)
}
else{
    res.status(404).json('item not found')

}
    }
    catch(error){
        res.status(401).json(error)

    }
}

//increment cart item count
exports.incrementcount=async(req,res)=>{
    //get product id from request p[arams
    const {id}=req.params
    try{
        //check if product in the cart
        const product=await carts.findOne({id})
        if(product){
            //increment product count and grand total
            product.quantity+=1
            product.grandTotal=product.price*product.quantity
            //save change in mongodb
            await product.save()
            //increment get all the products from cart after updating in particular cart item
            const allitems=await carts.find()
            res.status(200).json(allitems)

        }
        else{
            res.status(404).json('item not found')

        }
    }
    catch(error){
        res.status(401).json(error)

    }
}

//decrement cart item count
exports.decrementcount=async(req,res)=>{
    const {id}=req.params
    try{
        const product=await carts.findOne({id})
        if(product){
            product.quantity-=1
            if(product.quantity==0){
                await carts.deleteOne({id})
                const allitems=await carts.find()
                res.status(200).json(allitems)

            }
            else{
                product.grandTotal=product.price*product.quantity
                await product.save()
                const allitems=await carts.find()
                res.status(200).json(allitems)

            }
        }
        else{
            res.status(404).json('item not found')

        }
    } catch(error){
        res.status(401).json(error)

    }
}