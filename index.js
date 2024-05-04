import dotenv from 'dotenv';

import VectorDataBase from './vectordb.js';
dotenv.config();

const nameidx = "mytestone";

const apiPinecone = process.env.PINECONE_API_KEY;

const db = new VectorDataBase(apiPinecone);
db.initialize(nameidx);



