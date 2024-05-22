import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";

class DataProcessor {

    #batchSize;
    #BatchAdder;
    constructor() {
        this.#batchSize = 100;
        this.modelEmbed = new HuggingFaceTransformersEmbeddings({ model: "Xenova/all-MiniLM-L6-v2" });
        this.#BatchAdder = null;
    }


    getBatchSize = () => this.#batchSize;

    setBatchSize = (newsize) => this.#batchSize = newsize;

    #newEmbedding = (chunkid, embedvalues) => ({ embid: chunkid, values: embedvalues });

    #newVector = (vid, embdvalues, content, meta) => ({
        id: vid, values: embdvalues,
        metadata: { pageContent: content, loc: meta },
    });

    receiveBatchAdder = (func) => this.#BatchAdder = func;

    embedData = async (rawchunksarray) => {
        try {
            const tempholder = [];
            for (let idx = 0; idx < rawchunksarray.length; idx++) {
                let chunkid = rawchunksarray[idx].docid;
                let chunkvalues = rawchunksarray[idx].chunkvalues;
                let embedvalues = await this.modelEmbed.embedDocuments(chunkvalues.map((chunk) => chunk.pageContent));
                tempholder.push(this.#newEmbedding(chunkid, embedvalues));
            }
            return tempholder;
        }
        catch (error) {
            return null;
        }
    }

    createBatch = (chunksarray, embedarray) => {
        let vectorbatch = [];
        let batchid = 0;
        for (let chunkidx = 0; chunkidx < chunksarray.length; chunkidx++) {
            let currentchunk = chunksarray[chunkidx].chunkvalues;
            let currentembedding = embedarray[chunkidx].values;
            for (let idx = 0; idx < currentchunk.length; idx++) {
                if(vectorbatch.length === this.#batchSize || idx === currentchunk.length -1 ){
                    batchid++;
                    // this.#batchMap.addBatch(batchid, vectorbatch);
                    this.#BatchAdder(batchid, vectorbatch);
                    vectorbatch = [];
                }
                let vid = `${chunkidx}_${idx}`;
                let tempv = this.#newVector(
                    vid, currentembedding[idx], currentchunk[idx].pageContent,JSON.stringify(currentchunk[idx].metadata.loc)
                );
                vectorbatch.push(tempv);
            }

        }
    }

}


export default DataProcessor;