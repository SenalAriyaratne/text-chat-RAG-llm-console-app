import BatchArray from "./batcharray.js";
import DataLoader from "./loader.js";
import DataProcessor from "./processor.js";

import Batches from "./batcharray.js";

class DataController{

    #loader;
    #dataproc;
    #batchds;
    #rawChunkArray;
    #embdedArray;

    constructor(){
        this.#batchds = new Batches();
        this.#loader = new DataLoader();
        this.#dataproc = new DataProcessor();
        this.#loader.setSplitterParams(30,5);
    }

    loadPDF = async (filepath) => await this.#loader.loadData(filepath);

    createChunks = async(rawdocs) => this.#rawChunkArray = await this.#loader.produceChunks(rawdocs);

    returnChunks = () => this.#rawChunkArray;

    returnEmbeddings = () => this.#embdedArray;

    numberOfBatches = () => this.#batchds.getSize();

    embedChunks = async () =>  this.#embdedArray = await this.#dataproc.embedData(this.#rawChunkArray);

    produceBatches = () => {
        this.#dataproc.receiveBatchAdder(this.#batchds.addBatch.bind(this.#batchds));
        this.#dataproc.createBatch(this.#rawChunkArray, this.#embdedArray);
    }

    retrieveBatches = () => this.#batchds.getAllBatches();

    checkBatch = (key) => this.#batchds.getBatch(key);
    
}

export default DataController;