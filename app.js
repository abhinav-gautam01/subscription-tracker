import express from 'express';
import {PORT} from './config/env.js';
const app = express();
import subscriptionRouter from './routes/subscription.routs.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(arcjetMiddleware);


app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/workflows', workflowRouter);

app.get('/' , (req,res)=>{
    res.json({
        msg: 'new server created'
    });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});





app.use(errorMiddleware);

app.listen(PORT, async ()=>{
     console.log(`server started ${PORT}`);

     await connectToDatabase();
});

export default app;