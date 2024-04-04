import { cleanEnv, port, str } from 'envalid'

const env = cleanEnv(process.env, {
    PORT: port(),
    MONGO_CONNECTION_STRING: str(),
    DEV_ORIGIN: str(),
    NODE_ENV: str(),
    JWT_ACCESSTOKEN_SECRET: str()
})

export default env;