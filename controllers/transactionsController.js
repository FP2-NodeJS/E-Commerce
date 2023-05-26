const {
    User,
    Category,
    Product,
    TransactionHistory
} = require('../models')

class TransactionController {
    static async order(req, res) {
        try {
            const {
                productId,
                quantity
            } = req.body

            const { id } = req.UserData

            // Pengecekan data product jika data product yang dibeli ada atau tidak. Jika ada maka proses dapat dilanjut dan jika tidak maka throw error
            const checkProduct = await Product.findOne({
                where: {
                    id: productId
                }
            })
            if (!checkProduct) {
                throw {
                    code: 404,
                    message: "Product not Found!"
                }
            }

            // Cek stock product
            if (quantity > checkProduct.stock) {
                throw {
                    code: 400,
                    message: "Product exceeds the stock limit!"
                }
            }

            // Cek balance
            let total = checkProduct.price * quantity
            const checkUserBalance = await User.findOne({
                where: {
                    id
                }
            })
            if (checkUserBalance.balance < total) {
                throw {
                    code: 400,
                    message: "insufficient balance"
                }
            }

            // Update Stock dan Balance
            let newStock = checkProduct.stock - quantity
            let newBalance = checkUserBalance.balance - total
            const updateStock = await Product.update({
                stock: newStock
            }, {
                where: {
                    id: checkProduct.id
                }
            })

            const updateBalance = await User.update({
                balance: newBalance
            }, {
                where: {
                    id: id
                }
            })

            //add sold product amount
            const checkCategorySold = await Category.findByPk(checkProduct.CategoryId)
            const sold_product = checkCategorySold.sold_product_amount + quantity
            const updateSoldProduct =await Category.update({
                sold_product_amount : sold_product
            },{
                where:{
                    id: checkCategorySold.id
                }
            })

            const pushTransaction = await TransactionHistory.create({
                ProductId: productId,
                UserId: id,
                quantity,
                total_price: total
            })

            let currency = Intl.NumberFormat('en-ID',{
                style:"currency",
                currency: "IDR"
            })
            const prices = currency.format(total)
            

            const response = {
                message: "You have successfully purchase the product!",
                transactionBill: {
                    "total_price": "Rp. " + prices,
                    "quantity": quantity,
                    "product_name": checkProduct.title
                }
            }
            console.log(response);
            // res.status(200).json(response)
        } catch (error) {
            res.status(error?.code || 500).json(error)
        }
    }

    static async getUserTransaction(req, res) {
        try {
            const { id: asd } = req.UserData
            const response = await TransactionHistory.findAll({
                where: {
                    UserId: asd
                },
                include: [
                    {
                        model: Product,
                        attributes: [
                            'id',
                            'title',
                            'price',
                            'stock',
                            'CategoryId'
                        ]
                    }
                ],
                attributes: {
                    exclude: ['id']
                }

            })

            //change currency
            for(let i =  0 ; i < response.length;i++){
                let currency = Intl.NumberFormat('en-ID',{
                    style:"currency",
                    currency: "IDR"
                })
                response[i].total_price = currency.format(response[i].total_price)
                response[i].Product.price = currency.format(response[i].Product.price)
            }

            res.status(200).json({ transactionHistories: response })
        } catch (error) {
            res.status(error?.code || 500).json(error)
        }
    }

    static async getAdmin(req, res) {
        try {
            const { id: idAdmin } = req.UserData

            const admin = await User.findOne({
                where: {
                    id: idAdmin
                }
            })

            if (admin.role !== "admin") {
                throw {
                    code: 403,
                    message: "You are not an admin!"
                }
            }

            const response = await TransactionHistory.findAll({
                include: [
                    {
                        model: Product,
                        attributes: [
                            'id',
                            'title',
                            'price',
                            'stock',
                            'CategoryId'
                        ]
                    }, {
                        model: User,
                        attributes: [
                            'id',
                            'email',
                            'balance',
                            'gender',
                            'role'
                        ]
                    }
                ],
                attributes: {
                    exclude: ['id']
                }
            })

            //checck currency
            for(let i =  0 ; i < response.length;i++){
                let currency = Intl.NumberFormat('en-ID',{
                    style:"currency",
                    currency: "IDR"
                })
                response[i].total_price = currency.format(response[i].total_price)
                response[i].Product.price = currency.format(response[i].Product.price)
                response[i].User.balance = currency.format(response[i].User.balance)
            }

            res.status(200).json({ transactionHistories: response })
        } catch (error) {
            res.status(error?.code || 500).json(error)
        }
    }

    static async getTransactionById(req, res) {
        try {
            const transId = req.params.transactionId
            const { id: userId } = req.UserData

            const checkUser = await User.findOne({
                where: {
                    id: userId
                }
            })

            const checkTransaction = await TransactionHistory.findOne({
                where: {
                    id: transId
                }
            })

            if (!checkUser) {
                throw {
                    code: 404,
                    message: "User not Found!"
                }
            }

            if (checkTransaction.UserId !== checkUser.id && checkUser.role !== "admin") {
                throw {
                    code: 403,
                    message: "You are not allowed to access this data!"
                }
            }
            const response = await TransactionHistory.findOne({
                where: {
                    id: transId
                },

                attributes: {
                    exclude: ['id']
                },

                include: [
                    {
                        model: Product,
                        attributes: [
                            'id',
                            'title',
                            'price',
                            'stock',
                            'CategoryId'
                        ]
                    }
                ]
            })

            //change currency
            let currency = Intl.NumberFormat('en-ID',{
                style:"currency",
                currency: "IDR"
            })
            response.total_price = currency.format(response.total_price)
            response.Product.price = currency.format(response.Product.price)

            res.status(200).json(response)
        } catch (error) {
            res.status(error?.code || 500).json(error)

        }
    }
}

module.exports = TransactionController