import { OpenAIEmbeddings } from '@langchain/openai';
import { Pinecone } from '@pinecone-database/pinecone';



class VectorDataBase {
    constructor(apikey) {
        this.apiKey = apikey;
        this.index = null;

    }

    initialize = async (indexname) => {
        try {
            const vectordb = new Pinecone({
                apiKey: this.apiKey,
            });

            await vectordb.createIndex({
                name: indexname,
                dimension: 8,
                metric: 'cosine',
                spec: {
                    serverless: {
                        cloud: 'aws',
                        region: 'us-east-1'
                    }
                }
            });
            
            console.log(`Vector Database initialized with index name ${indexname}`)

        } catch (error) {
            console.log(`Error initializing PineCone DataBase  ${error.message}`);

        }    
    }


}

export default VectorDataBase;