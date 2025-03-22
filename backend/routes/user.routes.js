const router = require('express').Router();
const User = require('../models/user.schema');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../utils/user.auth');

// Sign Up

const validate = (username, password) => {
    if(!username || typeof username !== 'string' || username.length < 4){
        return  {
            isValid: false,
            message: "Username length must be greater than 3"
        }
    }
    if(!password || typeof password !== 'string' || password.length < 6){
        return {
            isValid: false,
            message: "Password length must be greater than 5"
        }
    }

    return  {
        isValid: true
    }
}

router.post('/sign-up', async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        const validation = validate(username, password);
        if(!validation.isValid){
            return res.status(400).json(
                {
                    message: validation.message
                }
            )
        }

        const existingUser = await User.findOne(
            {
                $or: [
                    { username },
                    { email }
                ]
            }
        )
        if(existingUser){
            return res.status(400).json(
                {
                    message: existingUser.username === username ? "Username already exists" : "Email already exists"
                }
            )
        }

        const newUser = new User({
            username,
            email,
            password,
            address
        })

        await newUser.save();

        return res.status(201).json(
            {
                message: "User created successfully"
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                message: "Internal Server Error"
            }
        )
    }
})

router.post('/sign-in', async (req, res) => {
    try {
        const {username, password} = req.body;

        const findUserByUsername = await User.findOne({username});
        if(!findUserByUsername){
            return res.status(401).json(
                {
                    message: "Invalid Credentials"
                }
            )
        }

        const isMatch = await findUserByUsername.comparePassword(password);
        if(!isMatch){
            return res.status(401).json(
                {
                    message: "Invalid Credentials"
                }
            )
        }

        // const authClaims = {
        //     name: findUserByUsername.username,
        //     role: findUserByUsername.role
        // }


        const token = jwt.sign(
            { id: findUserByUsername._id, name: findUserByUsername.username, role: findUserByUsername.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json(
            {
                id: findUserByUsername._id,
                role: findUserByUsername.role,
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                message: "Internal Server Error"
            }
        )
    }
})

router.get('/get-user-information', authenticateToken, async(req, res) => {
    try {
        const { id } = req.user;
        const data = await User.findById(id).select('-password');
        if(!data){
            return res.status(404).json(
                {
                    message: "User not found"
                }
            )
        }
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json(
            {
                message: "Internal Server Error"
            }
        )
    }
})

router.put('/update-address', authenticateToken, async(req, res) => {
    try {
        const { id } = req.user;

        const { address } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, { address }, { new: true, runValidators: true });

        if(!updatedUser){
            return res.status(404).json(
                {
                    message: "User not found"
                }
            )
        }

        return res.status(200).json(
            {
                message: "Address updated successfully"
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                message: "Internal Server Error"
            }
        )
    }
})

module.exports = router;