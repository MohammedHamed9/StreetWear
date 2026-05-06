const Cart=require("../models/CartModel");
const Product=require("../models/ProductModel");
const appError = require("../utils/appError");
async function getCart(userId,guestId){
    if(userId)
    return await Cart.findOne({user:userId});
    if(guestId)
    return await Cart.findOne({guestId});
return null
}
const cartCtrl={
    addToCart:async (req,res,next)=>{
        try{
           const {productId,userId,guestId,size,color,quantity}=req.body
           const product=await Product.findOne({
            _id:productId,
            variants:{
                $elemMatch:{
                    size:size,
                    color:color
                }
            }
           });
              if(!product){
                return next(new appError('The Product is not exist!',404));
            }
        const isOutOfStock=product.variants.some(v=>
        v.color===color && v.size===size && quantity>v.stock
        )
        if (isOutOfStock==true) {
        return next(new appError('Sorry, not enough quantity in the stock!', 400));
        }       

        const cart =await getCart(userId,guestId);
        console.log(cart);
        if(cart!=null){
            
        const productIndex=cart.products.findIndex((product)=>
        product.productId.toString()===productId&&
        product.size===size&&
        product.color===color);
            if(productIndex!=-1){
            cart.products[productIndex].quantity+=quantity
            
            }else{
            cart.products.push({
                productId,
                name:product.name,
                image:product.images[0].url,
                price:product.price,
                size,
                color,
                quantity
            })
        
            }
            cart.totalPrice=cart.products.reduce(
                (acc,item)=>acc+ (item.price*item.quantity),0)
        await cart.save();
        res.status(201).json({
            cart
        });

        }else{
            const NewCart=await Cart.create({
                user: userId ? userId:undefined,
                guestId:userId?undefined:(guestId ? guestId :new Date().getTime()),
                products:[
                    {
                        productId,
                        name:product.name,
                        image:product.images[0].url,
                        size,
                        color,
                        quantity,
                        price:product.price
                    }
                ],
                totalPrice:product.price*quantity
            });

              res.status(201).json({
                cart:NewCart
            });
           }
           
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
    updateProductQuantity:async (req,res,next)=>{
        try{
            const {productId,quantity,size,color,userId,guestId}=req.body
            const cart=await getCart(userId,guestId)
            if(!cart){
            return res.status(404).json({
                message:"This Cart nout found!",
            }); 
            }
             const product=await Product.findById(productId);
             if(!product){
                return next(new appError('The Product is not longer exist!',404));
            }
            const productIndex=cart.products.findIndex((product)=>
            product.productId==productId&&
            product.size===size&&
            product.color===color);
            if(productIndex!=-1){
            if(quantity>0){
               cart.products[productIndex].quantity=quantity;
            }else{
                cart.products.splice(productIndex,1);
            }
            const totalPrice=cart.products.reduce((acc,item)=>acc + (item.price * item.quantity),0);
           cart.totalPrice=totalPrice
            await cart.save();
            res.status(200).json({
                message:"the quantity is updated",
                cart
            });
        }else{
                return res.status(404).json({
                    message:"this product not exits in the cart"
                })
            }
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
    RemoveProduct:async (req,res,next)=>{
        try{
            const {productId,size,color,userId,guestId}=req.body
            
             const cart=await getCart(userId,guestId)
            if(!cart){
            return res.status(404).json({
                message:"This Cart nout found!",
            }); 
            }
            const productIndex=cart.products.findIndex((product)=>
            product.productId==productId&&
            product.size===size&&
            product.color===color);
            if(productIndex!=-1){
                cart.products.splice(productIndex,1);
                const totalPrice=cart.products.reduce(
                (acc,item)=>
                acc+(item.price*item.quantity),0);
                cart.totalPrice=totalPrice;
                await cart.save()
                return res.status(203).json({
                    cart
                });
            }else{
                return res.status(404).json({
                    message:"this product not exits in the cart"
                })
            }
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
    getCart:async (req,res,next)=>{
        try{
        const{userId,guestId}=req.query;
        const cart=await getCart(userId,guestId)
            if(!cart){
            return res.status(200).json({
                cart: { products: [] }
            }); 
            }else{
                return res.status(200).json({
                cart
            });
            }
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
    mergeCarts:async(req,res,next)=>{
        try{
            //convert from guest to user when the user Login 
            const{guestId}=req.body;// "guestId": "1776344024937",
            const guestCart=await Cart.findOne({guestId})
            const userCart=await Cart.findOne({user:req.user._id});
            if(guestCart){
                if(guestCart.products.length==0)
                return res.status(400).json({ message: "Guest cart is empty" });
                if(userCart){
                guestCart.products.forEach((guestItem)=>{
                    const productIndex=userCart.products.findIndex((item)=>{
                       return guestItem.productId.toString()==item.productId.toString()&&
                        guestItem.size==item.size&&
                        guestItem.color==item.color
                    });
                    if(productIndex>-1){
                        userCart.products[productIndex].quantity+=guestItem.quantity
                    }else{
                        userCart.products.push(guestItem);
                    }
                    })

                userCart.totalPrice=userCart.products.reduce((acc,item)=>
                acc+(item.price*item.quantity),0);
                await userCart.save()
                await Cart.deleteOne({guestId});
                return res.status(200).json({
                    message:"Done Merging",
                    cart:userCart
                });
                }
                else{
                guestCart.user=req.user.id;
                guestCart.guestId=undefined;
                await guestCart.save();
                res.status(200).json({
                message:"User doest have a cart so converted",
                cart:guestCart
            });
                }
            }else{
               if(userCart)
                return res.status(200).json({cart:userCart})
    
            return res.status(200).json({
                   message:"Guest Cart not found "
                })    
            }
        }
        catch(error){
            console.log(error);
            next(new appError('somthing went wrong!',500));
        }
    }
}
module.exports=cartCtrl
/*
if(size){
               let isSizeExist=product.variants.some(el=>el.size===size);
               if(!isSizeExist)
                return res.status(404).json({
                message:"Sorry this size not exists now."
                })
            }
            if(color){
            let isColorExist=product.variants.some(el=>el.color===color);
            if(!isColorExist)
                return res.status(404).json({
                message:"Sorry this color not exists now."
                })
            }*/