/** @format */

import mongoose from 'mongoose';
import config from "../utils/config/config.js"
export async function db() {
    return mongoose
        .connect(`mongodb+srv://${config.db.username}:${config.db.password}@cluster0.9dygz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/${config.db.database}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((res) => console.log('DB connected succesfully'))
        .catch((err) => console.log('Error connecting'));
}
// LZoPldAfnZVMBUJC