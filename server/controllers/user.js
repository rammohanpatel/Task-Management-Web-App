import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";


const secret = 'taskmanagementsystem';
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: '1h' });
        res.status(200).json({ success: true, token });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'User already exists' });
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, username });
        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: '1h' });
        res.status(200).json({ success: true, token });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

// export const getUserInfo = async (req, res) => {
//     try {
//         const token = req.headers.authtoken;
//         const decodedData = jwt.verify(token, secret);
//         const user = await User.findById(decodedData.id);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({ success: true, user: { id: user._id, username: user.username, email: user.email } });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };
