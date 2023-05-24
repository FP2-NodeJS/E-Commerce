const {Product, Category}= require('../models')

class ProductController{
    static async AddProduct(req,res){
        try {
            const {title,price,stock,CategoryId} = req.body

            const checkCategory = await Category.findByPk(CategoryId)

            if(!checkCategory){
                return res.status(403).json({
                    message:`Category not found! please enter the correct CategoryId`
                })
            }

            const input = await Product.create({
                title, price, stock,CategoryId
            })
            let currency = Intl.NumberFormat('en-ID',{
                style:"currency",
                currency: "IDR"
            })
            const prices = currency.format(input.price)
            
            const response ={
                id : input.id,
                title: input.title,
                price: prices,
                stock: input.stock,
                CategoryId: input.CategoryId,
                createdAt: input.createdAt,
                updatedAt: input.updatedAt
            }
            res.status(201).json({product: response})
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }

    static async ShowProduct(req,res){
        try {
            const data = await Product.findAll()
            res.status(200).json({products:data})
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }

    static async EditProduct(req,res){
        try {
            const {title,price,stock} = req.body
            const {productId} = req.params
            
            const update = await Product.update({
                title, stock,price
            },{
                where:{
                    id: productId
                },
                returning:true
            })

            let currency = Intl.NumberFormat('en-ID',{
                style:"currency",
                currency: "IDR"
            })
            const prices = currency.format(update[1][0].price)
            
            const response ={
                id : update[1][0].id,
                title: update[1][0].title,
                price: prices,
                stock: update[1][0].stock,
                CategoryId: update[1][0].CategoryId,
                createdAt: update[1][0].createdAt,
                updatedAt: update[1][0].updatedAt
            }

            res.status(200).json({product: response})

        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }

    static async EditCategoryOfProduct(req,res){
        try {
            const {productId}= req.params
            const {CategoryId} = req.body

            const checkCategory = await Category.findByPk(CategoryId)

            if(!checkCategory){
                return res.status(403).json({
                    message:`Category not found! please enter the correct CategoryId`
                })
            }

            const updated = await Product.update({
                CategoryId
            },{
                where:{id:productId},
                returning: true
            })

            let currency = Intl.NumberFormat('en-ID',{
                style:"currency",
                currency: "IDR"
            })
            const prices = currency.format(updated[1][0].price)
            
            const response ={
                id : updated[1][0].id,
                title: updated[1][0].title,
                price: prices,
                stock: updated[1][0].stock,
                CategoryId: updated[1][0].CategoryId,
                createdAt: updated[1][0].createdAt,
                updatedAt: updated[1][0].updatedAt
            }
            res.status(200).json({product:response})

        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }

    static async DeleteProduct (req,res){
        try {
            const {productId} = req.params
            const del = await Product.destroy({
                where:{id: productId}
            })
            res.status(200).json({
                message:'Product has been successfully deleted'
            })
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }
}

module.exports= ProductController