/** @format */

import express from 'express';
import User from '../schemas/Users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../utils/config/config.js';
const router = express.Router();

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        const decode = jwt.decode(token);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(404).send('Error: ' + 'Jwt Authentication Required ');
    }
};


router.get('/users', isLoggedIn , async (req, res) => {
    const users = await User.find();
    if (req.user.role === 'user') {
        return res.status(403).send({ msg: 'Forbidden: Only admin can access this route' });
    }
    res.json(users);
});

router.get('/users/:userId',  isLoggedIn , async (req, res) => {
    try {
        const { userId } = req.params || {};

        const user = await User.findById(userId);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});

router.post('/register', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 12);
        const user = new User(req.body);
        const userExist = await User.findOne({ username: req.body?.username });
        if (userExist) {
            return res.status(400).send({ msg: 'Username already exists' });
        }
        await user.save();
        const token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
        });
        res.status(201).json({ data: user, token });
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body || {};
        const user = await User.findOne({ username: username });
        const decode = await bcrypt.compare(password, user.password);
        console.log(decode);
        if (!user || !decode) {
            return res.status(401).send({ msg: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
        });

        res.json({ data: user, token });
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});

router.patch('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const updated = await User.findByIdAndUpdate(id, { ...req.body });
        res.status(201).json('Updated');
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
