import app from "./app";
import env from "./util/validateEnv";
import mongoose, { mongo } from "mongoose";

mongoose.connect(env.MONGO_CONNECTION_STRING).then(() => {
    console.log("connected to db")
    app.listen(env.PORT, () => console.log('connected to port ' + env.PORT));
})