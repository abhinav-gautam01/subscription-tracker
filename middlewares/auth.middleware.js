import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

 const authorize = async (req,res, next)=>{
    try{
        let token;
        const authorization = req.headers.authorization;
        if(authorization && authorization.startsWith('Bearer')){
            token = authorization.split(' ')[1];
         }

         const decoded = jwt.verify(token,JWT_SECRET);
         if(!decoded){
            res.status(401).json({
                message: 'unauthorized access'
            });
        }
            const user = await User.findById({_id: decoded.userId});
         if(!user){
                res.status(201).json({
                    message: 'Unauthorized access'
                });
            }
         req.user = user;   //saving the user detail for further use 
         next();
    }
    catch(error){
        res.status(401).json({
             message: 'Unauthorized access',
             error: error.message
        });

        // next(error);//this will give the real error
    }
};

export default authorize;