import { config } from 'dotenv';  // Importing dotenv config function

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` }); 
// Loads the correct .env file based on NODE_ENV
// If NODE_ENV is not set, it defaults to `.env.development.local`

export  const { 
    PORT,  NODE_ENV,
    DB_URL,
    JWT_SECRET, JWT_EXPIRES_IN,
    ARCJET_KEY, ARCJET_ENV,
    QSTASH_URL,QSTASH_TOKEN,
    QSTASH_CURRENT_SIGNING_KEY, QSTASH_NEXT_SIGNING_KEY,
    SERVER_URL,
    EMAIL_PASSWORD
} = process.env;
// console.log(PORT, DB_URL); // Logs the PATH variable from the environment


