import { OpenAIEmbeddings } from '@langchain/openai';
import { Pinecone } from '@pinecone-database/pinecone';
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
import UtilityTools from '../utils/utility.js';
import { AsymmetricStructuredOutputParser } from 'langchain/output_parsers';
import DataLoader from '../datacontroller/loader.js';


class VectorDataBase {
    constructor(apikey, splitter = new DataLoader()) {
        this.apiKey = apikey;
        this.index = null;
        this.vectorDb = new Pinecone({
            apiKey: this.apiKey,
        });
        this.utility = new UtilityTools();

    }

    initializeIndex = async (indexname) => {
        this.index = indexname;
        console.log(`Validating index name ...`);
        const haveIndex = await this.checkIndex(this.index);

        if (haveIndex) 
        {
            console.log(`Index with the name ${this.index} already exists.`);
        } 
        else 
        {
            try {
                await this.vectorDb.createIndex({
                    name: this.index,
                    dimension: 8,
                    metric: 'cosine',
                    spec: {
                        serverless: {
                            cloud: 'aws',
                            region: 'us-east-1'
                        }
                    }
                });
                await this.utility.delay();
                console.log(`Vector Database initialized with index name ${this.index}`);
            } catch (error) {
                console.log(`Error initializing PineCone DataBase  ${error.message}`);
            }
        }
    }

    checkIndex = async (name) => {
        const currentIndexes = await this.vectorDb.listIndexes();
        const exists = currentIndexes.indexes.some(index => index.name === name);
        return exists;
    }


    embedData = async (rawdata) => {
        try {
            const modelEmbed = new HuggingFaceTransformersEmbeddings({ model: "Xenova/all-MiniLM-L6-v2"});
            return await modelEmbed.embedDocuments(rawdata);

        } catch (error) {
            return null;
        }
    }

    pushVector = async (data) => {
        try 
        {


        }
        catch (error) {

        }
    }

    queryIndex = async () => {

    }

    deleteIndex = async () => await this.vectorDb.deleteIndex(this.index);

    #batchVectors = async () => {

    }


}

export default VectorDataBase;