
const prepareQuery=(req,res,next)=>{
     let { sortBy,page,limit,skip,fields
        } =req.query
    let query={...req.query};
    
    query.page=parseInt(page,10)||1;
    query.limit =parseInt(limit,10)||10;
    query.skip=(req.query.page-1)*req.query.limit


    if(sortBy){
            switch(sortBy){
                case "priceAsc":
                   query.sortBy={price:1}
                   break;
                case "priceDesc":
                    query.sortBy={price:-1}
                    break;
                case "popularity":
                    query.sortBy={rating:-1}
                    break;
                default:
                query.sortBy={createdAt:-1}
            }
        
        }
    if(fields){
            query.fields=req.query.fields.split(",").join(" ")
        }else{
            query.fields=("-__v");
        }
    req.query=query;
    next();    
}
module.exports=prepareQuery;