const {Category, Product}= require('../models')

class CategoriesController{
    static async addCategory(req,res){
        try {
            const{type}= req.body
            const input = await Category.create({
                type: type,
                sold_product_amount : 0
            })
            const response ={
                id: input.id,
                type: input.type,
                createdAt: input.createdAt,
                updatedAt: input.updatedAt,
                sold_product_amount: input.sold_product_amount
            }
            res.status(201).json({category:response})
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }

    static async showCategory(req,res){
        try {
            const data = await Category.findAll({
                include: [{
                    model: Product
                }]
            })
            res.status(200).json({categories: data})
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }

    static async updateCategory(req,res){
        try {
            const {categoryId} = req.params
            const {type} = req.body
            const update = await Category.update({
                type:type
            },{
                where:{
                    id: categoryId
                },
                returning:true
            })
            res.status(200).json({category: update[1][0]})
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }

    static async deleteCategory(req,res){
        try {
            const {categoryId} = req.params
            const del = await Category.destroy({
                where:{id: categoryId}
            })
            res.status(200).json({
                message:'Category has been successfully deleted'
            })
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }
}

module.exports = CategoriesController