import { OpenAIEmbeddings } from '@langchain/openai';
import { Pinecone } from '@pinecone-database/pinecone';

import UtilityTools from '../utils/utility.js';
import { AsymmetricStructuredOutputParser } from 'langchain/output_parsers';
import { cat } from '@xenova/transformers';



class VectorDataBase {
    #vectorDb;
    constructor(apikey) {
        this.apiKey = apikey;
        this.indexName = null;
        this.index = null;
        this.#vectorDb = new Pinecone({
            apiKey: this.apiKey,
        });
        this.utility = new UtilityTools();
    }

    initializeIndex = async (indexname) => {
        this.indexName = indexname;
        console.log(`Validating index name ...`);
        const haveIndex = await this.checkIndex(this.indexName);

        if (haveIndex) {
            console.log(`Index with the name ${this.index} already exists.`);
        }
        else {
            try {
                await this.#vectorDb.createIndex({
                    name: this.indexName,
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
                console.log(`Vector Database initialized with index name ${this.indexName}`);
                this.index = this.#vectorDb.index(this.indexName);
            } catch (error) {
                console.log(`Error initializing PineCone DataBase  ${error.message}`);
            }

        }
    }

    checkIndex = async (name) => {
        const currentIndexes = await this.#vectorDb.listIndexes();
        const exists = currentIndexes.indexes.some(index => index.name === name);
        return exists;
    }

    pushVectorBatch = async (batchvector) => {

        try 
        {
            await this.index.namespace("testspace").upsert(batchvector);
        }
        catch (error) {
            console.error(error.message);

        }
    }

    queryIndex = async (queryembedding) => {
        try {
            const resp = await this.index.namespace("testspace").query({
                topK: 5,
                vector: queryembedding,
                includeMetadata: true
            });
            return resp;
        }
        catch (error) { 
            console.error(error.message);
            return null;
        }
    }

    deleteIndex = async () => await this.#vectorDb.deleteIndex(this.index);

}

export default VectorDataBase;