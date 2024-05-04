import { OpenAIEmbeddings } from '@langchain/openai';
import { Pinecone } from '@pinecone-database/pinecone';
class VectorDataBase{
    constructor(apikey){
        this.apiKey = apikey;

    }

    initialize = async () => {
        const vectordb = new Pinecone({
            apiKey: apikey
        });

    }


}