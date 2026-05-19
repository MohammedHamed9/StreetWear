const Cart=require("../models/CartModel");
const Product=require("../models/ProductModel");
const appError = require("../utils/appError");
const catchAsync = require("./catchAsync");
async function getCart(userId,guestId){
    if(userId)
    return await Cart.findOne({user:userId});
    if(guestId)
    return await Cart.findOne({guestId});
return null
}
const cartCtrl={
    addToCart: catchAsync(async (req,res,next)=>{
           const {productId,userId,guestId,size,color,quantity}=req.body
           console.log({productId,userId,guestId,size,color,quantity})
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
    }),
    updateProductQuantity: catchAsync(async (req,res,next)=>{
            const {productId,quantity,size,color,userId,guestId}=req.body
            const cart=await getCart(userId,guestId)
            if(!cart){
            return next(new appError("This Cart nout found!",404));
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
                return next(new appError("this product not exits in the cart",404));
            }

    }),
    RemoveProduct: catchAsync (async (req,res,next)=>{
            const {productId,size,color,userId,guestId}=req.body
            console.log({productId,size,color,userId,guestId})
             const cart=await getCart(userId,guestId)
            if(!cart){
            return next(new appError("This Cart nout found!",404));
            }
            const productIndex=cart.products.findIndex((product)=>
            product.productId==productId&&
            product.size===size&&
            product.color===color);
            console.log(productIndex)
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
                return next(new appError("this product not exits in the cart",404));
            }
    }),
    getCart: catchAsync(async (req,res,next)=>{
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
    }),
    mergeCarts: catchAsync(async(req,res,next)=>{
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
    })
}
module.exports=cartCtrl
