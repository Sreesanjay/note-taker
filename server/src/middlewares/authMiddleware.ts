import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../model/userModel';
import env from "../util/validateEnv";
import { IUser } from '../interface';
import mongoose from 'mongoose';


declare module 'express' {
    interface Request {
        user?: IUser;
    }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            const decoded = jwt.verify(token, env.JWT_ACCESSTOKEN_SECRET) as JwtPayload;
            const userId = new mongoose.Types.ObjectId(
                decoded.id
            );
            const user = await User.findById({ _id: userId })
            if (!user) {
                res.status(401).json({ error: true, message: 'Unauthorized user' })
            } else {
                req.user = user;
            }
            next();
        } else {
            res.status(401).json({ error: true, message: 'Unauthorized user' })
        }
    } catch (err) {
        if (typeof err === 'object' && err !== null && 'message' in err) {
            res.status(401);
            res.status(401).json({ error: true, message: 'Unauthorized user' })
        } else {
            res.status(500).json({ error: true, message: 'Internal server error' })
        }
    }

}