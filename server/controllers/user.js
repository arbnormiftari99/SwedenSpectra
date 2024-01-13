import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async(req,res) => {
    const { email, password } = req.body;
     try {
        const checkExistingUser = await User.findOne({email});
        if(!checkExistingUser){
            return res.status(404).json({message: 'User doesn\'t exist'});
        }
        const isPasswordValid = await bcrypt.compare(password, checkExistingUser.password);
        if(!isPasswordValid){
            return res.status(404).json({message: 'Incorrect Password'});
 }
        const token = jwt.sign({email: checkExistingUser.email, id: checkExistingUser._id}, 'arbnordrenica', {expiresIn: '1h'});
        res.status(200).json({result: checkExistingUser, token});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong with the sign in process. Please try again'});
    }
}

export const signup = async(req,res) => {
    const { email, password, confirmPassword, firstName, lastName,  } = req.body;

    try {
        const checkIfExist = await User.findOne({email});
        if(checkIfExist){
            return res.status(400).json({message: 'This email already exists'});
        }
        if(password !== confirmPassword){
            return res.status(400).json({message: 'Password doesn\'t match'});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, role: 'user'})
        const token = jwt.sign({email: result.email, id: result._id}, 'arbnordrenica', {expiresIn: '1h'});
        res.status(200).json({result, token});


    } catch (error) {
        res.status(500).json({message: 'Something went wrong with the sign up process. Please try again'});
    }

}