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

            //checck currency
            for(let i =  0 ; i < data.length;i++){
                if(data[i].Products.length>0){
                    for(let j=0;j<data[i].Products.length;j++){
                        if(data[i].Products[j]!=null ||data[i].Products[j]!=undefined){
                            let currency = Intl.NumberFormat('en-ID',{
                                style:"currency",
                                currency: "IDR"
                            })
                            
                            data[i].Products[j].price = currency.format(data[i].Products[j].price)
                        }
                    }
                }
            }
            
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