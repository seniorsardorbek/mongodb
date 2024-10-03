/** @format */

import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
    {
        title: {
            type: mongoose.SchemaTypes.String,
            required: true,
            unique: true,
        },
        description: {
            type: mongoose.SchemaTypes.String,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps :{
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    }

);
const Category = mongoose.model('Category', CategorySchema);

export default Category;
