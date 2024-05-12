import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
import Batches from "./batcharray.js";


class DataProcessor{

    #batchSize;
    #batchMap;
    constructor(){
        this.#batchSize = 100;
        this.modelEmbed = new HuggingFaceTransformersEmbeddings({ model: "Xenova/all-MiniLM-L6-v2"});
        this.#batchMap = new Batches();
    }


    getBatchSize = () => this.#batchSize;

    setBatchSize = (newsize) => this.#batchSize = newsize;

    #newEmbedding = (chunkid, embedvalues) => ({ embid: chunkid, values: embedvalues });

    #newVector = () =>{};

    getBatches = () => this.#batchMap.getAllBatches();


    embedData = async (rawchunksarray) => {
        try 
        {
            const tempholder = [];
            for(let idx = 0; idx < rawchunksarray.length; idx++)
            {
                let chunkid = rawchunksarray[idx].docid;
                let chunkvalues = rawchunksarray[idx].chunkvalues;
                let embedvalues =  await this.modelEmbed.embedDocuments(chunkvalues.map((chunk) => chunk.pageContent));
                tempholder.push(this.#newEmbedding(chunkid,embedvalues));
            }
            return tempholder;
        } 
        catch (error) 
        {
            return null;
        }
    }

    createBatch = (chunksarray, embedarray) => {


    }

    










}


export default DataProcessor;