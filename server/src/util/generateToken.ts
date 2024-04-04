import jwt from 'jsonwebtoken';
import env from "./validateEnv";

const ACCESSTOKEN_MAX_AGE = 3 * 24 * 60 * 60;

const generateToken = async (email: string, id: string) => {
    try {
        const accessToken = jwt.sign({ email, id }, env.JWT_ACCESSTOKEN_SECRET, { expiresIn: ACCESSTOKEN_MAX_AGE });
        if (accessToken) {
            return Promise.resolve(accessToken);
        } else {
            return Promise.reject(new Error('Could not generate token'));
        }
    } catch (error) {
        return Promise.reject(error);
    }

};

export default generateToken;