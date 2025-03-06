import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { createSubscription, getUserSubscriptions } from '../controllers/subscription.controller.js';
const subscriptionRouter= Router();


subscriptionRouter.get('/', (req,res)=>{
    res.json({
        title: 'get ll subscriptions'
    });
});
subscriptionRouter.get('/:id', (req,res)=>{
    res.json({
        title: 'get subscription detail by id'
    });
});
subscriptionRouter.post('/', authorize, createSubscription);
subscriptionRouter.put('/:id', (req,res)=>{
    res.json({
        title: 'update subscription'
    });
});
subscriptionRouter.delete('/:id', (req,res)=>{
    res.json({
        title: 'delete a subscription by id'
    });
});
subscriptionRouter.get('/user/:id', authorize , getUserSubscriptions );
subscriptionRouter.put('/:id/cancel', (req,res)=>{
    res.json({
        title: 'cancel subsription '
    });
});
subscriptionRouter.put('/upcoming-renewals', (req,res)=>{
    res.json({
        title: 'get upcoming renewals '
    });
});

export default subscriptionRouter;