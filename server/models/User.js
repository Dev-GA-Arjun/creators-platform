import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 2,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please provide a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    }
},{
    timestamps: true
})

export default mongoose.model("User",userSchema)