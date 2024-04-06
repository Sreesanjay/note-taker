import express from 'express';
import "dotenv/config";
import env from "./util/validateEnv";
import morgan from 'morgan'
import cookieParser from "cookie-parser";
import cors from "cors"
import indexRoute from "./routes/index"

const app = express();

const corsConfig = {
    origin: env.NODE_ENV === "development" ? env.DEV_ORIGIN : env.DEP_ORIGIN,
    credentials: true,
};
if (env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser());
app.use(cors(corsConfig))

app.use('/api', indexRoute)

export default app;