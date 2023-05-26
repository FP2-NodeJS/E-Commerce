const {User} = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")

class UserController{
    static async register(req,res){
        try {
            const {full_name, password,gender,email} = req.body
            const input = await User.create({
                full_name: full_name, 
                password: password,
                gender:gender,
                email:email,
                balance: 0,
                role:"customer"
            })
            let currency = Intl.NumberFormat('en-ID',{
                style:"currency",
                currency: "IDR"
            })
            const balance = currency.format(input.balance)
            const response ={
                id :input.id,
                full_name: input.full_name,
                email: input.email,
                gender: input.gender,
                balance: balance,
                createdAt: input.createdAt
            }
            res.status(201).json({user: response})
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }

    static async login(req,res){
        try{
            const {email,password} = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
        
            if (!user) {
                throw {
                    code: 404,
                    message: "User not found"
                }
            }
        
            // compare password
          const isCorrect = comparePassword(password, user.password)
    
          if (!isCorrect) {
            throw {
              code: 401,
              message: "Incorrect password"
            }
          }
    
          const response = {
            id: user.id,
            email: user.email,
            username: user.username
          }
    
          const token = generateToken(response)
    
          res.status(200).json({
            token
          })
    
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
          
        }
    }

    static async EditUser(req,res){
        try {
            const {email,full_name} =req.body
            const id = req.UserData.id
            const data = await User.update({
                email,full_name
            },{
                where: {id},
                returning: true
            })
            const response ={
                id: data[1][0].id,
                full_name: data[1][0].full_name,
                email: data[1][0].email,
                createdAt: data[1][0].createdAt,
                updatedAt: data[1][0].updatedAt
            }
            res.status(200).json({user: response})
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }

    static async deleteUsers(req,res){
        try {
            const id = req.UserData.id
            const del= await User.destroy({
                where:{id}
            })
            if(!del) {
                throw {
                    code: 404,
                    message: "data not found"
                }
            }
            res.status(200).json({"message":"your account has sucessfully deleted"})
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }

    static async topUpBalance(req,res){
        try {
            const {balance} = req.body
            const id = req.UserData.id
            const data = await User.findByPk(id)
            const balanceUpdate = data.balance + balance
            const updated = await User.update({
                balance: balanceUpdate
            },{
                where:{id},
                returning:true
            })

            //change currency
            let currency = Intl.NumberFormat('en-ID')
            const update = currency.format(updated[1][0].balance)
            
            res.status(200).json({
                message : `your balance has been successfully updated to Rp ${update}`
            })
        } catch (error) {
            res.status(500).json({
                status : 500,
                message: error
            })
        }
    }
}

module.exports = UserController