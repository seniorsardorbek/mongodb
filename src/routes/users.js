/** @format */

import express from 'express';
import User from '../schemas/Users.js';
const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});


router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});




router.patch('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const updated = await User.findByIdAndUpdate(id, { ...req.body });
        res.status(201).json('Updated' );
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});




router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});

export default router;
