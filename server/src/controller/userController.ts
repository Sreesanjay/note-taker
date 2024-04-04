import User from "../model/userModel"
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import generateToken from "../util/generateToken";

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: true,
                message: 'email or password missing'
            })
        }
        const exist = await User.findOne({ email: email })
        if (exist) {
            return res.status(400).json({
                error: true,
                message: 'email already exist'
            })
        }
        const newUser = await new User({ email, password }).save();
        if (newUser) {
            const token = await generateToken(newUser.email, newUser._id)
            return res.status(201).json({
                success: true,
                message: 'user registered successfully',
                token: token
            })
        }

    } catch (err: any) {
        res.status(500).json({
            error: true,
            message: err.message
        })
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: true,
                message: 'email or password not found'
            })
        }
        const user = await User.findOne({ email: email });
        console.log(user)
        if (!user) {
            res.status(409);
            return res.json({
                error: true,
                message: 'user or password not match'
            })
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const accessToken = await generateToken(user.email, user._id);
            res.status(201).json({
                success: true,
                message: "User loged in successfully",
                email: user.email,
                token: accessToken,
            });
        } else {
            res.status(401);
            return res.json({
                error: true,
                message: 'user or password not match'
            })
        }
    } catch (err) {
        return res.json({
            error: true,
            message: 'Internal server error'
        })
    }
}