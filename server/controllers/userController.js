import User from '../models/User.js'
import bcrypt from 'bcrypt'

// @desc Register a new User
// @route POST /api/users/register
// @access Public
const registerUser = async (req,res) => {
    try{
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please Input all required fields" 
            })
        }
        const existingUser = await User.find({email})
        if (existingUser.length !== 0){
            return res.status(400).json({
                success: false,
                message: "User with this email already exits"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({name, email, password: hashedPassword})
        user.password = undefined
        res.status(201).json({
            success:true,
            message: "Registeration Successful",
            data: user
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Interanl Server Error",
            error: err.message
        })
    }
}

// @desc Get all user
// @route GET /api/users
// @access Public (will be protected with auth later)

const getAllUsers = async (req,res) => {
    try{
        const users = await User.find().select('-password')
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message: "Error in Fetching Data",
            error: err.message
        })
    }
}

// @desc Get user by Id
// @route GET /api/users/:id
// @access Public(protected)

const getUserById = async (req,res) => {
    try{
        const id = req.params.id
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            data: user
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error in Fetching Data",
            error: err.message
        })
    }
}

// @desc Update user
// @route PUT /api/users/:id
// @access Private(auth later)

const updateUser = async (req,res) => {
    try{
        const id = req.params.id
        const { name, email } = req.body
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        if (name) user.name = name
        if (email) user.email = email

        await user.save()
        user.password = undefined
        res.status(200).json({
            success: true,
            message: "Updated User Successfully",
            data: user
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error in Updated User",
            error: err.message
        })
    }
}

// @desc Delete user
// @route /api/users/:id
// @access Private(will add auth later)

const deleteUser = async (req,res) => {
    try{
        const id = req.params.id
        const user = await User.findByIdAndDelete(id)
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success:true,
            message: "Delete User Successfully"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error in Deleting the User",
            error: err.message
        })
    }
    
}

export  {registerUser, getAllUsers, getUserById, updateUser, deleteUser}