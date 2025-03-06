import mongoose from 'mongoose';
import { DB_URL,NODE_ENV } from '../config/env.js';

if(!DB_URL){
    throw new Error('please define mongo_db URL in <env.<development/production>.local');
}
console.log(DB_URL);
console.log(NODE_ENV);


const connectToDatabase= async()=>{
    try{
        await mongoose.connect(DB_URL);
        console.log(`db-connected in ${NODE_ENV} mode`);

    }
    catch(error){
        console.error(`Erro while connecting to databse : ${error}`);
        process.exit(1);
    }
};

export default connectToDatabase;