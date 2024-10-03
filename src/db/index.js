/** @format */

import mongoose from 'mongoose';
export async function db() {
    return mongoose
        .connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((res) => console.log('DB connected succesfully'))
        .catch((err) => console.log('Error connecting'));
}
