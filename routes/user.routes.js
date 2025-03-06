import { Router } from 'express';
import { getUser, getUsers } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';
const userRouter= Router();

// /api/v1/users/

userRouter.get('/',getUsers );
userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req,res)=>{
    res.json({
        title: 'get all users'
    });
});
userRouter.put('/', (req,res)=>{
    res.json({
        title: 'update  user details'
    });
});
userRouter.get('/:id', (req,res)=>{
    res.json({
        title: 'delete user'
    });
});

export default userRouter;