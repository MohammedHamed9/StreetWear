const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config()
const Product=require("./models/ProductModel");
const Category=require("./models/CategoryModel");
const Brand=require("./models/BrandModel");
const products=require("./data/products");
let Db=process.env.DB
mongoose.connect(Db,{
        dbName:'streatwear'
    }).then(()=>console.log('Connected To DB..'));

async function importData(){
try{
let admin_created_id="69cc035b51c4a31ef6270d55"
let sampleProuctsP= products.map(async(product)=>{
    const category=await Category.findOne({name:product.category});
    const brand=await Brand.findOne({name:product.brand});
    return{...product,category:category?category._id:null,brand: brand? brand._id:null,admin_created_id}
});
let sampleProucts=await Promise.all(sampleProuctsP);
    await Product.insertMany(sampleProucts);
    console.log('Data Successfully Loaded! ✅');
    process.exit();
}catch(error){
    console.log(error);
        process.exit();

}
}
async function deleteData(){
    try{
        await Product.deleteMany();
        console.log('Data Successfully Deleted! 🗑️');
        process.exit();

    }
    catch(error){
    console.log(error);
        process.exit();
    }
}
if(process.argv[2]==="--import")
    importData()
else if(process.argv[2]==="--delete")
    deleteData()