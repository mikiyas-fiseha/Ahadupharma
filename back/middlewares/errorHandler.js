const notFound=(req,res,next)=>{
    const error=new Error(`not Found :${req.originalUrl}`)
    res.status(200)
    next(error);
}

const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode==200?500:statusCode
    res.status(statusCode)
    res.json({
        message:err?.message,
        stack:err?.stack
    });
}

module.exports={notFound,errorHandler}