import {dotenv} from 'dotenv';
import {AnthropicAgent} from './agent';
dotenv.config();

apiPineconce = process.env.PINECONE_API_KEY;

const agent = new AnthropicAgent()


