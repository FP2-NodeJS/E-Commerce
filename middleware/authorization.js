const {User,Category,Product} = require('../models')

async function AdminAuthorization(req,res,next){
    const id = req.UserData.id
    const user = await User.findByPk(id)
    if(user.role != "admin"){
        return res.status(400).json({
            message : `${req.UserData.email} are not Admin ! only admin access this`
        })
    }else{
        next()
    }
}

async function CategoriesAuthor(req,res,next){
    const {categoryId} = req.params
    const search = await Category.findByPk(categoryId)
    if(!search){
        return res.status(403).json({
            message:  `Category for id ${categoryId} not found!`
        })
    }else{
        next()
    }
}

async function ProductsAuthor(req,res,next){
    const {productId} = req.params
    const search = await Product.findByPk(productId)
    if(!search){
        return res.status(403).json({
            message:  `Product for id ${productId} not found!`
        })
    }else{
        next()
    }
}

module.exports= {AdminAuthorization,CategoriesAuthor, ProductsAuthor}